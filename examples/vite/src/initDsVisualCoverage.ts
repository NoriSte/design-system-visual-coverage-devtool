import { createLogger } from '@noriste/ds-visual-coverage-core';

import {
    createGetContainerData,
    createCalculateDsVisualCoverages,
    exposeGlobalDsVisualCoverageObject,
} from '@noriste/ds-visual-coverage-preply-web';

const checkInterval = 60_000;

export function initDsVisualCoverage(): {
    start: () => void;
    cancel: () => void;
    runNow: () => void;
} {
    let coverageIntervalId: ReturnType<typeof setInterval> | undefined;
    const logger = createLogger(true);
    let createCalculateDsVisualCoveragesResult:
        | ReturnType<typeof createCalculateDsVisualCoverages>
        | undefined = undefined;

    function trackError(error: unknown) {
        logger.error(error);
    }

    function start() {
        coverageIntervalId = setInterval(() => {
            try {
                createCalculateDsVisualCoveragesResult?.run({
                    onError: trackError,
                    onComplete: () => {
                        // pass log:true to createCalculateDsVisualCoverages to see this log
                    },
                });
            } catch (error) {
                trackError(error);
            }
        }, checkInterval);
        logger.log('Interval started');
    }

    function runNow() {
        createCalculateDsVisualCoveragesResult?.run({
            onError: trackError,
            onComplete: () => {
                // pass log:true to createCalculateDsVisualCoverages to see this log
            },
        });
    }

    function cancel() {
        createCalculateDsVisualCoveragesResult?.cancel();
        if (coverageIntervalId !== undefined) clearInterval(coverageIntervalId);
    }

    exposeGlobalDsVisualCoverageObject();

    createCalculateDsVisualCoveragesResult = createCalculateDsVisualCoverages({
        getContainerData: createGetContainerData(),
        log: true,
    });

    return {
        start,
        cancel,
        runNow,
    };
}
