<script lang="ts">
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import type { FilterState, Site, TermCategory } from '$lib/types/site.js';

  const groups: Array<{ category: TermCategory; label: string }> = [
    { category: 'base', label: '基础属性' },
    { category: 'extra', label: '附加属性' },
    { category: 'skill', label: '技能属性' },
  ];

  let { site, filters }: { site: Site; filters: FilterState } = $props();

  function isSelected(category: TermCategory, term: string) {
    return filters[category] === term;
  }
</script>

<Card.Root class="gap-3 py-3">
  <Card.Header class="px-3">
    <div class="flex items-start justify-between gap-3">
      <div>
        <Card.Title>{site.name}</Card.Title>
        <Card.Description>
          {site.location.region} / {site.location.subRegion} / {site.location.spot}
        </Card.Description>
      </div>
      <Badge>匹配</Badge>
    </div>
  </Card.Header>
  <Card.Content class="grid gap-3 px-3">
    {#each groups as group}
      <section class="grid gap-1.5">
        <h3 class="text-xs font-medium text-muted-foreground">{group.label}</h3>
        <div class="flex flex-wrap gap-1.5">
          {#each site.terms[group.category] as term}
            <Badge variant={isSelected(group.category, term) ? 'default' : 'outline'}>{term}</Badge>
          {/each}
        </div>
      </section>
    {/each}
  </Card.Content>
</Card.Root>
