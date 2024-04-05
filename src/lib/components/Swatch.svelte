<script lang="ts">
  import type { Swatch } from '$lib/palette/Swatch.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { formatLch } from '$lib/palette/utils'
  import { formatHex } from 'culori'

  const { swatch, expanded }: { swatch: Swatch; expanded: boolean } = $props()

  const context = getPaletteContext()

  const settings = $derived(context.settings)
</script>

<button
  class="swatch"
  class:expanded
  class:selected={swatch.isSelected}
  class:defined={swatch.isDefined}
  style:--bg={(settings.showInRgb ? formatHex : formatLch)(swatch.color)}
  onclick={() => (swatch.isSelected ? swatch.deselect() : swatch.select())}
>
</button>

<style lang="postcss">
  .swatch {
    position: relative;
    padding: 0;
    display: inline-block;
    position: relative;
    flex: 1;
    border: none;
    background-color: var(--bg);
    height: 4rem;
    border-radius: 0.25rem;

    &.expanded {
      height: 6rem;
      cursor: pointer;
    }

    &:hover,
    &.selected {
      outline: 2px solid color-mix(in oklab, #0005 10%, var(--bg));
    }

    &.defined {
      &::after {
        position: absolute;
        top: -1.3rem;
        left: 50%;
        translate: -50% 0;
        content: '⌄';
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 1rem;
      }
    }
    &:not(:first) {
      margin-left: -1px;
    }
  }
</style>
