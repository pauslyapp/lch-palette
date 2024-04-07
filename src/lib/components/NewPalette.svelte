<script lang="ts">
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'

  const context = getPaletteContext()

  const library = $derived(context.library)

  let newPalette = $state({
    name: 'blue',
    color: '#3b82f6',
    count: 12,
  })
</script>

<form
  class="new-palette"
  action="#"
  onsubmit={(e) => {
    e.preventDefault()
    library.palettes.push(Palette.fromColors(newPalette.name, [newPalette.color], newPalette.count))
  }}
>
  <h3>New palette</h3>

  <label>
    <span>Color name</span>
    <input type="text" bind:value={newPalette.name} />
  </label>
  <label>
    <span>Color count</span>
    <input type="number" min="5" max="20" step="1" bind:value={newPalette.count} />
  </label>
  <label>
    <span>Color</span>
    <input bind:value={newPalette.color} type="color" />
  </label>

  <div class="actions">
    <button class="@button" type="submit">Add palette +</button>
  </div>
</form>

<style lang="postcss">
  form {
    display: grid;
    place-content: center;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-tertiary);
    margin-inline: auto;
    border-radius: 0.5rem;
    width: max-content;
    max-width: 100%;
    padding: 1rem;

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
