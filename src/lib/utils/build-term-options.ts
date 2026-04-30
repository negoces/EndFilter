import type { Site, TermCategory, TermOptions } from '$lib/types/site.js';

const termCategories: TermCategory[] = ['base', 'extra', 'skill'];

export function buildTermOptions(sites: Site[]): TermOptions {
  const buckets = {
    base: new Set<string>(),
    extra: new Set<string>(),
    skill: new Set<string>(),
  };

  sites.forEach((site) => {
    termCategories.forEach((category) => {
      site.terms[category].forEach((term) => {
        buckets[category].add(term);
      });
    });
  });

  return {
    base: Array.from(buckets.base).sort((left, right) => left.localeCompare(right, 'zh-Hans-CN')),
    extra: Array.from(buckets.extra).sort((left, right) => left.localeCompare(right, 'zh-Hans-CN')),
    skill: Array.from(buckets.skill).sort((left, right) => left.localeCompare(right, 'zh-Hans-CN')),
  };
}
