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

<Card.Root>
  <Card.Header>
    <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Card.Title>{site.name}</Card.Title>
        <Card.Description>
          {site.location.region} / {site.location.subRegion} / {site.location.spot}
        </Card.Description>
      </div>
      <Badge>匹配结果</Badge>
    </div>
  </Card.Header>
  <Card.Content class="grid gap-4">
    {#each groups as group}
      <section class="grid gap-2">
        <h3 class="text-sm font-medium text-muted-foreground">{group.label}</h3>
        <div class="flex flex-wrap gap-2">
          {#each site.terms[group.category] as term}
            <Badge variant={isSelected(group.category, term) ? 'default' : 'outline'}>{term}</Badge>
          {/each}
        </div>
      </section>
    {/each}
  </Card.Content>
</Card.Root>
