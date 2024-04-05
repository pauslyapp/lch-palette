<script lang="ts">
  import ColorSchemeSwitcher from '$lib/components/ColorSchemeSwitcher.svelte'
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  // import { createTestPalettes } from '$lib/palette/test'

  const context = getPaletteContext()

  const library = $derived(context.library)
  const settings = $derived(context.settings)

  let newColor = $state('#3b82f6')
</script>

<div class="actions">
  <form
    class="actions"
    action="#"
    onsubmit={(e) => {
      e.preventDefault()
      library.palettes.push(Palette.fromColors([newColor], 12))
    }}
  >
    <input bind:value={newColor} type="color" />
    <button class="@button" type="submit">Add palette +</button>
  </form>
  <!-- <button class="@button" onclick={() => library.palettes.push(...createTestPalettes())}
    >Create demo palettes</button
  > -->
  <button class="@button" disabled={!library.needsSaving} onclick={() => library.save()}
    >Save 💾</button
  >
  <button class="@button" disabled={!library.needsSaving} onclick={() => library.reset()}
    >Reset ↩️</button
  >

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

<style lang="postcss">
  section {
    margin-top: 3rem;
  }
  form {
    input {
      height: 2.25rem;
    }
  }
</style>
