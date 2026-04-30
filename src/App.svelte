<script lang="ts">
  import { onMount } from 'svelte';
  import FilterPanel from '$lib/components/filter-panel.svelte';
  import SiteResults from '$lib/components/site-results.svelte';
  import { loadSites } from '$lib/data/sites.js';
  import type { FilterState, Site, TermCategory } from '$lib/types/site.js';
  import { buildTermOptions } from '$lib/utils/build-term-options.js';
  import { filterSites } from '$lib/utils/filter-sites.js';

  const initialFilters: FilterState = {
    base: null,
    extra: null,
    skill: null,
  };

  let sites = $state<Site[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let filters = $state<FilterState>({ ...initialFilters });

  let termOptions = $derived(buildTermOptions(sites));
  let filteredSites = $derived(filterSites(sites, filters));
  let termCount = $derived(termOptions.base.length + termOptions.extra.length + termOptions.skill.length);

  onMount(() => {
    let cancelled = false;

    async function load() {
      isLoading = true;
      error = null;

      try {
        const loadedSites = await loadSites();

        if (!cancelled) {
          sites = loadedSites;
        }
      } catch (caught) {
        if (!cancelled) {
          error = caught instanceof Error ? caught.message : '未能读取本地站点数据，请检查 public/data/sites.json。';
          sites = [];
        }
      } finally {
        if (!cancelled) {
          isLoading = false;
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  });

  function handleFilterChange(category: TermCategory, value: string | null) {
    filters = {
      ...filters,
      [category]: value,
    };
  }

  function handleReset() {
    filters = { ...initialFilters };
  }
</script>

<main class="min-h-screen bg-background px-3 py-4 text-foreground sm:px-4 lg:px-6">
  <div class="mx-auto grid w-full max-w-7xl gap-4">
    <section class="grid gap-3 text-center sm:text-left">
      <div class="grid gap-1">
        <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">游戏基质词条查询工具</h1>
        <p class="max-w-3xl text-sm text-muted-foreground">
          从本地 sites.json 读取数据，按基础属性、附加属性和技能属性即时筛选。
        </p>
      </div>
      <div class="grid gap-2 sm:grid-cols-3">
        <div class="rounded-lg border border-border bg-card px-3 py-2 text-card-foreground">
          <p class="text-xs text-muted-foreground">静态数据源</p>
          <p class="mt-0.5 text-sm font-semibold">/data/sites.json</p>
        </div>
        <div class="rounded-lg border border-border bg-card px-3 py-2 text-card-foreground">
          <p class="text-xs text-muted-foreground">已加载点位</p>
          <p class="mt-0.5 text-sm font-semibold">{sites.length}</p>
        </div>
        <div class="rounded-lg border border-border bg-card px-3 py-2 text-card-foreground">
          <p class="text-xs text-muted-foreground">可筛选词条</p>
          <p class="mt-0.5 text-sm font-semibold">{termCount}</p>
        </div>
      </div>
    </section>

    <div class="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
      <div class="lg:sticky lg:top-4">
        <FilterPanel
          {filters}
          options={termOptions}
          {isLoading}
          disabled={Boolean(error)}
          totalCount={sites.length}
          resultCount={filteredSites.length}
          onChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>

      <SiteResults sites={filteredSites} {filters} {isLoading} {error} totalCount={sites.length} />
    </div>
  </div>
</main>
