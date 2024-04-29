<script lang="ts">
  import { clickOutside } from '$lib/actions/click-outside'
  import type { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { formatLch } from '$lib/palette/utils'
  import Swatch from './Swatch.svelte'
  import SwatchEditor from './SwatchEditor.svelte'

  const { palette }: { palette: Palette } = $props()

  const { library, settings } = getPaletteContext()

  let expanded = $derived(palette.selectedSwatchIndex !== -1)

  let borderColor = $derived(
    formatLch(
      settings.colorScheme === 'light'
        ? palette.swatches.at(2)?.color
        : palette.swatches.at(-2)?.color,
    ),
  )

  let backgroundColor = $derived(
    formatLch(
      settings.colorScheme === 'light'
        ? palette.swatches.at(1)?.color
        : palette.swatches.at(-1)?.color,
    ),
  )
</script>

<div
  class="palette"
  class:expanded
  style:--_color-border={borderColor}
  use:clickOutside
  onoutclick={() => {
    palette.deselectAll()
  }}
>
  <header style:--_color-bg={backgroundColor}>
    <div class="@actions">
      <input type="text" bind:value={palette.name} />
      <div class="@@spacer"></div>
      <button class="@button" onclick={() => library.duplicatePalette(palette)}>Duplicate 👯</button
      >
      <button class="@button" onclick={() => library.removePalette(palette)}>Remove 🛑</button>
    </div>
  </header>
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
  .palette {
    padding: 1px;
    position: relative;
    margin-block: 3rem;
    &::before {
      content: '';
      position: absolute;
      inset: -0.5rem;
      outline: 2px solid var(--_color-border);
      border-radius: 0.5rem;
      z-index: -1;
    }
  }

  header {
    background: var(--_color-bg);
    padding: 0.125rem 0.75rem;
    border-radius: 0.5rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin: -0.5rem;
  }
  .swatches {
    position: relative;
    display: flex;
    gap: 0.1875rem;
    margin-block: 2rem 0.5rem;
  }

  .palette-name {
    position: absolute;
    top: 0.5rem;
    left: 0;
    font-weight: bold;
    font-size: 0.875rem;
  }
</style>
