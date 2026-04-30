<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
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

  function pillClass(category: TermCategory, value: string) {
    const selected = selectedValue(category) === value;

    return [
      'inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium leading-5 transition-colors disabled:pointer-events-none disabled:opacity-50',
      selected
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-background text-foreground hover:bg-muted',
    ].join(' ');
  }
</script>

<Card.Root class="gap-3 py-3">
  <Card.Header class="px-3">
    <div class="flex items-center justify-between gap-3">
      <div>
        <Card.Title>筛选条件</Card.Title>
        <Card.Description>命中 {resultCount} / {totalCount} 个点位</Card.Description>
      </div>
      <Button variant="outline" size="sm" disabled={isLoading && totalCount === 0} onclick={onReset}>重置</Button>
    </div>
  </Card.Header>
  <Card.Content class="grid gap-4 px-3">
    {#each groups as group}
      <section class="grid gap-2" aria-labelledby={`${group.category}-label`}>
        <div class="flex items-center justify-between gap-3">
          <h2 id={`${group.category}-label`} class="text-sm font-medium">{group.label}</h2>
          <span class="text-xs text-muted-foreground">{options[group.category].length} 个</span>
        </div>

        <div class="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby={`${group.category}-label`}>
          <button
            type="button"
            role="radio"
            aria-checked={selectedValue(group.category) === allOptionValue}
            disabled={disabled || (isLoading && options[group.category].length === 0)}
            class={pillClass(group.category, allOptionValue)}
            onclick={() => updateFilter(group.category, allOptionValue)}
          >
            不筛选
          </button>

          {#each options[group.category] as option}
            <button
              type="button"
              role="radio"
              aria-checked={selectedValue(group.category) === option}
              disabled={disabled || (isLoading && options[group.category].length === 0)}
              class={pillClass(group.category, option)}
              onclick={() => updateFilter(group.category, option)}
            >
              {option}
            </button>
          {/each}
        </div>
      </section>
    {/each}
  </Card.Content>
</Card.Root>
