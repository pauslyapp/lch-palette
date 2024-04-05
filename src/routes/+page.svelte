<script lang="ts">
  import PaletteViewer from '$lib/components/PaletteViewer.svelte'
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  // import { createTestPalettes } from '$lib/palette/test'

  const context = getPaletteContext()

  const library = $derived(context.library)
  const settings = $derived(context.settings)

  let newColor = $state('')
</script>

<label class="options">
  Hex: <input type="checkbox" bind:checked={settings.showInRgb} />
</label>
<br />

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
    <button class="@button" type="submit">Add palette</button>
  </form>
  <!-- <button class="@button" onclick={() => library.palettes.push(...createTestPalettes())}
    >Create demo palettes</button
  > -->
  <button class="@button" disabled={!library.needsSaving} onclick={() => library.save()}
    >Save</button
  >
  <button class="@button" disabled={!library.needsSaving} onclick={() => library.reset()}
    >Reset</button
  >
</div>

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
  form {
    input {
      height: 100%;
    }
  }
</style>
