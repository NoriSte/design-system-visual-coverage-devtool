import { createActor, setup } from 'xstate';
import type { Configuration } from './types';
import { defaultConfig } from './config/constants';

type Events = { type: 'start' };
type Context = Configuration & {};

export const initialContext: Context = { ...defaultConfig };

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
  }).createMachine({
    id: 'dsCoverageDevtool',
    context: initialContext,
    initial: 'idle',
    states: {
      idle: {
        on: {
          start: {
            target: 'start',
          },
        },
      },
      start: {},
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

  return { getState, start };
}
