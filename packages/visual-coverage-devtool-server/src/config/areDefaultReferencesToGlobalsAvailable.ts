import { exposedReferencesToGlobalsContainer } from './constants';

export function areDefaultReferencesToGlobalsAvailable() {
  return !!globalThis[exposedReferencesToGlobalsContainer];
}
