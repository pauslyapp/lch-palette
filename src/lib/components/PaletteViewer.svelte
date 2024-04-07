<script lang="ts">
  import { clickOutside } from '$lib/actions/click-outside'
  import type { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
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
    <header>
      <div class="actions">
        Palette:
        <button class="@button" onclick={() => library.removePalette(palette)}>Remove 🛑</button>
        <button class="@button" onclick={() => library.duplicatePalette(palette)}
          >Duplicate 👯</button
        >
        <input type="text" bind:value={palette.name} />
      </div>
    </header>
  {/if}
  <div class="swatches">
    {#each palette.swatches as swatch}
      <Swatch {expanded} {swatch} />
    {/each}
  </div>
  {#if expanded && palette.selectedSwatch}
    <SwatchEditor swatch={palette.selectedSwatch} />
  {/if}
</div>

<style lang="postcss">
  header {
    background: var(--color-bg-secondary);
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
  }
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
        inset: -0.5rem;
        border: 2px solid var(--color-border);
        border-radius: 0.5rem;
        z-index: -1;
      }
    }
  }
</style>
