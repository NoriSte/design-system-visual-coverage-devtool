// import { createCalculateDsVisualCoverages } from '@preply/ds-visual-coverage-preply-web';

export interface Configuration {
  /**
   * String references that will be eval'ed to find the DS coverage global functions etc.
   */
  referencesToGlobals: {
    createCalculateDsVisualCoverages: string;
  };
}
