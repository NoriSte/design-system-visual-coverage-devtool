import { assign, createActor, fromCallback, setup } from 'xstate';
import type { Configuration, CoverageContainersReference } from './types';
import { defaultConfiguration } from './config/constants';
import { areDefaultReferencesToGlobalsAvailable } from './config/areDefaultReferencesToGlobalsAvailable';
import { getDefaultReferencesToGlobals } from './config/getDefaultReferencesToGlobals';
import { produce } from 'immer';
import { getCoverageContainers } from './core/getCoverageContainers';
import type { OnVisualCoverageUpdate, State } from '@preply/ds-visual-coverage-web';
import {
  createCalculateDsVisualCoverages,
  createGetContainerData,
} from '@preply/ds-visual-coverage-preply-web';

type Events =
  | { type: 'start' }
  | { type: 'queryTheCoverageContainers' }
  | { type: 'configure'; configuration: Configuration }
  | { type: 'runDsCoverage'; onUpdate: OnVisualCoverageUpdate };
type Context = {
  configuration: Configuration;
  calculationState: State; // TODO: this is fully exposed for now but only the needed properties should be exposed
  coverageContainers: Array<CoverageContainersReference>;
};

export const initialContext: Context = {
  configuration: { ...defaultConfiguration },
  coverageContainers: [],

  calculationState: {
    state: 'idle',
  },
};

export function createDsCoverageDevtool(options: {
  // The function is left unsigned until XState typegen supports V5 https://stately.ai/docs/typegen
  // At that point, the consumer won't need to call `getState` from inside it (which is a workaround
  // to keep everything typed at the moment)
  onUpdate?: () => void;
}) {
  const { onUpdate } = options;

  const devtoolMachine = setup({
    actors: {
      calculateDsVisualCoverages: fromCallback<
        Events,
        Parameters<typeof createCalculateDsVisualCoverages>
      >(({ input, sendBack }) => {
        // const i = setInterval(() => {
        //   sendBack({ type: 'reminder' });
        // }, input.interval);

        const { run, cancel } = createCalculateDsVisualCoverages(input[0]);

        const onComplete = (...args) => console.log('onComplete', ...args);
        const onError = (...args) => console.log('onError', ...args);
        const onUpdate = (...args) => console.log('onUpdate', ...args);

        run({ onComplete, onError, onUpdate });

        sendBack({ type: 'helloCov' });

        return cancel;
      }),
    },
    types: {
      context: {} as Context,
      events: {} as Events,
    },
    actions: {
      setConfiguration: assign({
        configuration: ({ event }) => {
          if (event.type !== 'configure') throw new Error(`Wrong event type -${event.type}-`);
          return event.configuration;
        },
      }),
      setDefaultReferencesToGlobals: assign({
        configuration: ({ context }) =>
          produce(context.configuration, draft => {
            draft.referencesToGlobals = getDefaultReferencesToGlobals();
          }),
      }),
      queryTheCoverageContainers: assign({
        coverageContainers: ({ context }) => {
          const { coverageContainerDomAttribute: coverageContainerDomAttributeReference } =
            context.configuration.referencesToGlobals;

          const coverageContainerDomAttribute = eval(coverageContainerDomAttributeReference);

          return getCoverageContainers({
            coverageContainerDomAttribute,
            rootElement: globalThis.document.body,
          });
        },
      }),
    },
  }).createMachine({
    id: 'dsCoverageDevtool',
    initial: 'idle',
    context: initialContext,

    on: {
      queryTheCoverageContainers: {
        actions: 'queryTheCoverageContainers',
      },
    },

    states: {
      idle: { on: { start: { target: 'unconfigured' } } },

      unconfigured: {
        on: {
          configure: {
            actions: 'setConfiguration',
            target: 'configured',
          },
        },
        always: [
          {
            guard: areDefaultReferencesToGlobalsAvailable,
            actions: 'setDefaultReferencesToGlobals',
            target: 'configured',
          },
        ],
      },

      configured: {
        entry: [{ type: 'queryTheCoverageContainers' }],
        on: {
          runDsCoverage: {
            target: 'dsCoverageRunning',
          },
        },
      },

      dsCoverageRunning: {
        invoke: {
          src: 'calculateDsVisualCoverages',
          input: [
            {
              log: true,
              rootElement: globalThis.document.body,
              getContainerData: createGetContainerData(),
            },
          ],
        },
      },
    },
  });

  const actor = createActor(devtoolMachine).start();

  // Subscribe to state changes
  actor.subscribe(snapshot => {
    console.log('Current state:', snapshot);

    // It would be good to split the sent events from the XState events, but let's implement it first
    onUpdate?.();
  });

  function getState() {
    const snapshot = actor.getSnapshot();
    const { value, context } = snapshot;

    // console.log('getState', snapshot);
    return { value, context };
  }

  function start() {
    actor.send({ type: 'start' });
  }

  function setInitialConfiguration(configuration: Configuration) {
    actor.send({ type: 'configure', configuration });
  }

  function queryTheCoverageContainers() {
    actor.send({ type: 'queryTheCoverageContainers' });
  }

  function runDsCoverage() {
    actor.send({
      type: 'runDsCoverage',
      onUpdate: (...params) => {
        console.log('runDsCoverage', ...params);
      },
    });
  }

  return {
    getState,
    start,
    setInitialConfiguration,
    queryTheCoverageContainers,
    runDsCoverage,
  };
}
