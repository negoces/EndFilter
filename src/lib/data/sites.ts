import type { Site } from '$lib/types/site.js';

export async function loadSites(): Promise<Site[]> {
  const response = await fetch('/data/sites.json');

  if (!response.ok) {
    throw new Error('未能读取本地站点数据，请检查 public/data/sites.json。');
  }

  return response.json() as Promise<Site[]>;
}
