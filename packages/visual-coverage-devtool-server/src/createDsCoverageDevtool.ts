import { assign, createActor, setup } from 'xstate';
import type { Configuration, CoverageContainersReference } from './types';
import { defaultConfiguration } from './config/constants';
import { areDefaultReferencesToGlobalsAvailable } from './config/areDefaultReferencesToGlobalsAvailable';
import { getDefaultReferencesToGlobals } from './config/getDefaultReferencesToGlobals';
import { produce } from 'immer';
import { getCoverageContainers } from './core/getCoverageContainers';

type Events =
  | { type: 'start' }
  | { type: 'queryTheCoverageContainers' }
  | { type: 'configure'; configuration: Configuration };
type Context = {
  configuration: Configuration;
  coverageContainers: Array<CoverageContainersReference>;
};

export const initialContext: Context = {
  configuration: { ...defaultConfiguration },
  coverageContainers: [],
};

export function createDsCoverageDevtool(options: {
  // The function is left unsigned until XState typegen supports V5 https://stately.ai/docs/typegen
  // At that point, the consumer won't need to call `getState` from inside it (which is a workaround
  // to keep everything typed at the moment)
  onUpdate?: () => void;
}) {
  const { onUpdate } = options;

  const devtoolMachine = setup({
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

  return { getState, start, setInitialConfiguration, queryTheCoverageContainers };
}
