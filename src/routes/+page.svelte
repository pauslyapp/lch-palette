<script lang="ts">
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { createTestPalettes } from '$lib/palette/test'

  const context = getPaletteContext()

  const library = $derived(context.library)
  const settings = $derived(context.settings)
</script>

<div class="options">
  Hex: <input type="checkbox" bind:checked={settings.showInRgb} />
</div>
<br />
<button onclick={() => library.palettes.push(...createTestPalettes())}>Create demo palettes</button>
<button disabled={!library.needsSaving} onclick={() => library.save()}>Save</button>
<button disabled={!library.needsSaving} onclick={() => library.reset()}>Reset</button>

<section class="@section +first">
  {#each library.palettes as palette (palette)}
    <PaletteViewer {palette} />
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
