// import { createCalculateDsVisualCoverages } from '@preply/ds-visual-coverage-preply-web';

export interface ReferencesToGlobals {
  coverageContainerDomAttribute: string;
  createCalculateDsVisualCoverages: string;
}

export interface Configuration {
  /**
   * String references that will be eval'ed to find the DS coverage global functions etc.
   */
  referencesToGlobals: ReferencesToGlobals;
}

export interface CoverageContainersReference {
  element: Element;
}
