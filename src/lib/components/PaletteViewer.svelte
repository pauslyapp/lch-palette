<script lang="ts">
  import { clickOutside } from '$lib/actions/click-outside'
  import type { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import PalettePlot from './PalettePlot.svelte'
  import Swatch from './Swatch.svelte'
  import SwatchEditor from './SwatchEditor.svelte'

  const { palette }: { palette: Palette } = $props()

  const { library } = getPaletteContext()

  let expanded = $derived(palette.selectedSwatchIndex !== -1)
</script>

<div
  class="palette"
  class:expanded
  use:clickOutside
  onoutclick={() => {
    palette.deselectAll()
  }}
>
  {#if expanded}
    <div class="actions">
      <button class="@button" onclick={() => library.removePalette(palette)}>Remove</button>
      <button class="@button" onclick={() => library.duplicatePalette(palette)}>Duplicate</button>
    </div>
  {/if}
  <div class="swatches">
    {#each palette.swatches as swatch}
      <Swatch {expanded} {swatch} />
    {/each}
  </div>
  {#if expanded && palette.selectedSwatch}
    <SwatchEditor swatch={palette.selectedSwatch} />
  {/if}
  {#if expanded}
    <div class="plot">
      <PalettePlot colors={palette.swatches.map((s) => s.color)} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .swatches {
    position: relative;
    display: flex;
    gap: 0.1875rem;
    margin-block: 2rem 0.5rem;
    &:hover {
      .defined {
        outline: 2px solid #000;
      }
    }
  }
  .palette {
    margin-block: 1.5rem;
    position: relative;
    &.expanded {
      margin-block: 3rem;
      &::before {
        content: '';
        position: absolute;
        inset: -1rem;
        border: 3px solid #0002;
        border-radius: 0.5rem;
        z-index: -1;
      }
    }
  }
</style>
