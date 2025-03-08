import { createActor, setup } from 'xstate';

export function createDsCoverageDevtool() {
    const devtoolMachine = setup({
        types: {
            context: {} as { count: number },
            events: {} as { type: 'start' },
        },
    }).createMachine({
        id: 'dsCoverageDevtool',
        context: { count: 0 },
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

    console.log({ devtoolMachine });

    // Create an actor (running instance of the machine)
    const actor = createActor(devtoolMachine).start();

    // Subscribe to state changes
    actor.subscribe(snapshot => {
        console.log('Current state:', snapshot.value);
        console.log('Last event:', snapshot.event); // Last received event
    });

    function getState() {
        const snapshot = actor.getSnapshot();
        const { value, context } = snapshot;
        console.log('getState', snapshot);
        return { value, context };
    }
    function start() {
        return actor.send({
            type: 'start',
        });
    }

    return { getState, start };
}
