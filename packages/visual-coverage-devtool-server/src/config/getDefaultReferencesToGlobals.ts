import type { ReferencesToGlobals } from '../types';
import { exposedReferencesToGlobalsContainer } from './constants';

export function getDefaultReferencesToGlobals(): ReferencesToGlobals {
  return {
    coverageContainerDomAttribute: `globalThis.${exposedReferencesToGlobalsContainer}.coverageContainerDomAttribute`,
    createCalculateDsVisualCoverages: `globalThis.${exposedReferencesToGlobalsContainer}.createCalculateDsVisualCoverages`,
  };
}
