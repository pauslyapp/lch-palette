<script lang="ts">
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { Palettes } from '$lib/palette/Palettes.svelte'
  import { createTestPalettes } from '$lib/palette/test'

  let hex = $state(false)

  const palettes = new Palettes()
</script>

<div class="options">
  Hex: <input type="checkbox" bind:checked={hex} />
</div>
<br />
<button onclick={() => palettes.palettes.push(...createTestPalettes())}>test</button>

<section class="@section +first">
  {#each palettes.palettes as palette}
    <PaletteViewer {palette} />
    <button onclick={() => palettes.removePalette(palette)}>Remove</button>
  {/each}
</section>

<style lang="postcss">
  .options {
    position: fixed;
    top: 0rem;
    right: 0rem;
    z-index: 10;
  }
  section {
    margin-top: 3rem;
  }
</style>
