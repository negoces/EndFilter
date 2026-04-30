<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import type { FilterState, TermCategory, TermOptions } from '$lib/types/site.js';

  const allOptionValue = '__all__';

  const groups: Array<{ category: TermCategory; label: string }> = [
    { category: 'base', label: '基础属性' },
    { category: 'extra', label: '附加属性' },
    { category: 'skill', label: '技能属性' },
  ];

  let {
    filters,
    options,
    isLoading,
    disabled,
    totalCount,
    resultCount,
    onChange,
    onReset,
  }: {
    filters: FilterState;
    options: TermOptions;
    isLoading: boolean;
    disabled: boolean;
    totalCount: number;
    resultCount: number;
    onChange: (category: TermCategory, value: string | null) => void;
    onReset: () => void;
  } = $props();

  function selectedValue(category: TermCategory) {
    return filters[category] ?? allOptionValue;
  }

  function updateFilter(category: TermCategory, value: string) {
    onChange(category, value === allOptionValue ? null : value);
  }
</script>

<Card.Root>
  <Card.Header>
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Card.Title>筛选条件</Card.Title>
        <Card.Description>
          当前命中 {resultCount} / {totalCount} 个点位。
        </Card.Description>
      </div>
      <Button variant="outline" disabled={isLoading && totalCount === 0} onclick={onReset}>重置</Button>
    </div>
  </Card.Header>
  <Card.Content class="grid gap-6">
    {#each groups as group}
      <section class="grid gap-3" aria-labelledby={`${group.category}-label`}>
        <div class="flex items-center justify-between gap-3">
          <h2 id={`${group.category}-label`} class="text-sm font-medium">{group.label}</h2>
          <span class="text-xs text-muted-foreground">{options[group.category].length} 个词条</span>
        </div>

        <RadioGroup.Root
          value={selectedValue(group.category)}
          disabled={disabled || (isLoading && options[group.category].length === 0)}
          class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          onValueChange={(value) => updateFilter(group.category, value)}
        >
          <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm hover:bg-muted/60">
            <RadioGroup.Item value={allOptionValue} id={`${group.category}-${allOptionValue}`} />
            不筛选
          </label>

          {#each options[group.category] as option}
            <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm hover:bg-muted/60">
              <RadioGroup.Item value={option} id={`${group.category}-${option}`} />
              {option}
            </label>
          {/each}
        </RadioGroup.Root>
      </section>
    {/each}
  </Card.Content>
</Card.Root>
