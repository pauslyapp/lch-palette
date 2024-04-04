<script lang="ts">
  import type { Palette } from '$lib/palette/Palette.svelte'
  import Swatch from './Swatch.svelte'

  const { palette }: { palette: Palette } = $props()
</script>

<div class="palette">
  <div class="swatches">
    {#each palette.swatches as swatch}
      <Swatch {swatch} />
    {/each}
  </div>
  <div class="plot">
    <!-- <PalettePlot colors={palette.swatches.map((s) => s.color)} /> -->
  </div>
</div>

<style lang="postcss">
  .swatches {
    display: flex;
    &:hover {
      .defined {
        outline: 2px solid #000;
      }
    }
  }
  .palette {
    margin-block: 1.5rem;
  }
</style>
