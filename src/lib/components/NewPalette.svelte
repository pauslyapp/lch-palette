<script lang="ts">
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'

  const context = getPaletteContext()

  const library = $derived(context.library)

  let newColor = $state('#3b82f6')
  let newCount = $state(12)
</script>

<form
  class="new-palette"
  action="#"
  onsubmit={(e) => {
    e.preventDefault()
    library.palettes.push(Palette.fromColors([newColor], newCount))
  }}
>
  <h3>New palette</h3>

  <label>
    <span>Color count</span>
    <input type="number" min="5" max="20" step="1" bind:value={newCount} />
  </label>
  <label>
    <span>Color</span>
    <input bind:value={newColor} type="color" />
  </label>

  <div class="actions">
    <button class="@button" type="submit">Add palette +</button>
  </div>
</form>

<style lang="postcss">
  form {
    display: grid;
    place-content: center;

    input[type='color'] {
      height: 2.25rem;
    }

    label {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
      span {
        width: 8rem;
      }
    }
  }
</style>
