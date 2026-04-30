import type { FilterState, Site, TermCategory } from '$lib/types/site.js';

const termCategories: TermCategory[] = ['base', 'extra', 'skill'];

export function filterSites(sites: Site[], filters: FilterState) {
  return sites.filter((site) => {
    return termCategories.every((category) => {
      const selectedTerm = filters[category];

      if (selectedTerm === null) {
        return true;
      }

      return site.terms[category].includes(selectedTerm);
    });
  });
}
