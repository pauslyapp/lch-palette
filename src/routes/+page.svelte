<script lang="ts">
  import ColorSchemeSwitcher from '$lib/components/ColorSchemeSwitcher.svelte'
  import Export from '$lib/components/Export.svelte'
  import NewPalette from '$lib/components/NewPalette.svelte'
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import About from './About.svelte'

  const context = getPaletteContext()

  const library = $derived(context.library)
  const settings = $derived(context.settings)

  let showExport = $state(false)

  let hasPalettes = $derived(library.palettes.length > 0)
</script>

{#if showExport}
  <Export onclose={() => (showExport = false)} />
{/if}

<div class="@actions">
  <!-- <button class="@button" onclick={() => library.palettes.push(...createTestPalettes())}
    >Create demo palettes</button
  > -->
  {#if hasPalettes}
    <button class="@button" onclick={() => library.save()}> Save 💾 </button>
    <button class="@button" disabled={!library.hasUpdates} onclick={() => library.reset()}>
      Reset ↩️
    </button>
    <button
      class="@button"
      disabled={library.palettes.length === 0}
      onclick={() => (showExport = true)}
    >
      Export 📤
    </button>
  {/if}

  <div class="spacer"></div>

  {#if hasPalettes}
    <label class="@button" title="Display all color values in RGB instead of Oklch">
      <span>RGB</span>
      <input type="checkbox" bind:checked={settings.showInRgb} />
    </label>
  {/if}

  <ColorSchemeSwitcher />
</div>

<section class="@section +first">
  {#each library.palettes as palette (palette)}
    <PaletteViewer {palette} />
  {/each}
</section>

<NewPalette />

<hr />

<About />

<style lang="postcss">
  section {
    margin-top: 3rem;
  }
  .spacer {
    flex: 1;
  }
</style>
