import type { ReferencesToGlobals } from '../types';
import { exposedReferencesToGlobalsContainer } from './constants';

export function getDefaultReferencesToGlobals(): ReferencesToGlobals {
  return {
    createCalculateDsVisualCoverages: `globalThis.${exposedReferencesToGlobalsContainer}.createCalculateDsVisualCoverages`,
  };
}
