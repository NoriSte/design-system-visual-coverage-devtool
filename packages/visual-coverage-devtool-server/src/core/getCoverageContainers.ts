import type { CoverageContainersReference } from '../types';

export function getCoverageContainers(params: {
  coverageContainerDomAttribute?: string;
  rootElement: HTMLElement;
}) {
  const { coverageContainerDomAttribute, rootElement } = params;

  const coverageContainers: Array<CoverageContainersReference> = [];

  if (coverageContainerDomAttribute) {
    const domElements = rootElement.querySelectorAll(`[${coverageContainerDomAttribute}]`);

    for (let i = 0, n = domElements.length; i < n; i++) {
      const domElement = domElements[i];
      if (!domElement) throw new Error(`No element at ${i} (this should be a TS-only protection)`);

      coverageContainers.push({ element: domElement });
    }
  }

  coverageContainers.push({ element: rootElement });
  return coverageContainers;
}
