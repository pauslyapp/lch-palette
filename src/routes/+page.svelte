<script lang="ts">
  import ColorSchemeSwitcher from '$lib/components/ColorSchemeSwitcher.svelte'
  import Export from '$lib/components/Export.svelte'
  import NewPalette from '$lib/components/NewPalette.svelte'
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'

  const context = getPaletteContext()

  const library = $derived(context.library)
  const settings = $derived(context.settings)

  let showExport = $state(false)
</script>

{#if showExport}
  <Export onclose={() => (showExport = false)} />
{/if}

<div class="actions">
  <!-- <button class="@button" onclick={() => library.palettes.push(...createTestPalettes())}
    >Create demo palettes</button
  > -->
  <button class="@button" onclick={() => library.save()}> Save 💾 </button>
  <button class="@button" disabled={!library.needsSaving} onclick={() => library.reset()}>
    Reset ↩️
  </button>
  <button
    class="@button"
    disabled={library.palettes.length === 0}
    onclick={() => (showExport = true)}
  >
    Export 📤
  </button>

  <ColorSchemeSwitcher />

  <label class="@button" title="Display all color values in RGB instead of Oklch">
    <span>RGB</span>
    <input type="checkbox" bind:checked={settings.showInRgb} />
  </label>
</div>

<section class="@section +first">
  {#each library.palettes as palette (palette)}
    <PaletteViewer {palette} />
  {/each}
</section>

<NewPalette />

<style lang="postcss">
  section {
    margin-top: 3rem;
  }
</style>
