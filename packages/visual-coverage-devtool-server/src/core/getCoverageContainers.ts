import type { CoverageContainersReference } from '../types';

export function getCoverageContainers(params: {
  rootElement: HTMLElement;
  coverageContainerDomAttribute?: string;
  previousContainers: Array<CoverageContainersReference>;
}) {
  const { coverageContainerDomAttribute, rootElement, previousContainers } = params;

  const coverageContainers: Array<CoverageContainersReference> = previousContainers.map(item => ({
    ...item,
    available: false,
  }));

  if (coverageContainerDomAttribute) {
    const domElements = rootElement.querySelectorAll(`[${coverageContainerDomAttribute}]`);

    for (let i = 0, n = domElements.length; i < n; i++) {
      const domElement = domElements[i];
      if (!domElement) throw new Error(`No element at ${i} (this should be a TS-only protection)`);

      const coverageContainerDomAttributeValue = domElement.getAttribute(
        coverageContainerDomAttribute,
      );

      if (!coverageContainerDomAttributeValue)
        throw new Error(
          `The element doesn't have the coverage attribute (this should be a TS-only protection)`,
        );

      const existingContainer = coverageContainers.find(
        item =>
          item.element.getAttribute(coverageContainerDomAttribute) ===
          coverageContainerDomAttributeValue,
      );
      if (existingContainer) {
        existingContainer.available = true;
        existingContainer.element = domElement;
      } else {
        coverageContainers.push({ element: domElement, available: true });
      }
    }
  }

  return coverageContainers;
}
