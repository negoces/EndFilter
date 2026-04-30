<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import SiteCard from '$lib/components/site-card.svelte';
  import type { FilterState, Site } from '$lib/types/site.js';

  let {
    sites,
    filters,
    isLoading,
    error,
    totalCount,
  }: {
    sites: Site[];
    filters: FilterState;
    isLoading: boolean;
    error: string | null;
    totalCount: number;
  } = $props();

  let hasActiveFilters = $derived(Boolean(filters.base || filters.extra || filters.skill));
</script>

<section class="grid gap-4">
  <div class="flex flex-col gap-1">
    <h2 class="text-xl font-semibold tracking-tight">查询结果</h2>
    <p class="text-sm text-muted-foreground">
      {#if hasActiveFilters}
        当前条件匹配 {sites.length} 个点位。
      {:else}
        未设置筛选条件，展示全部 {totalCount} 个点位。
      {/if}
    </p>
  </div>

  {#if isLoading}
    <Card.Root>
      <Card.Content class="py-8 text-center text-sm text-muted-foreground">正在读取本地站点数据…</Card.Content>
    </Card.Root>
  {:else if error}
    <Card.Root>
      <Card.Content class="py-8 text-center text-sm text-destructive">{error}</Card.Content>
    </Card.Root>
  {:else if sites.length === 0}
    <Card.Root>
      <Card.Content class="py-8 text-center text-sm text-muted-foreground">没有找到符合当前条件的点位。</Card.Content>
    </Card.Root>
  {:else}
    <div class="grid gap-4">
      {#each sites as site (site.id)}
        <SiteCard {site} {filters} />
      {/each}
    </div>
  {/if}
</section>
