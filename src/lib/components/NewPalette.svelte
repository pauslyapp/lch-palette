<script lang="ts">
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { formatHex, parse } from 'culori'

  const context = getPaletteContext()

  const library = $derived(context.library)

  const INITIAL_COLORS = ['#3b82f6', '', '']

  let newPalette = $state({
    name: 'blue',
    colors: [...INITIAL_COLORS],
    count: 12,
  })

  let canSubmit = $derived(newPalette.colors.find(Boolean))

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault()
    library.palettes.push(
      Palette.fromColors(newPalette.name, [...newPalette.colors.filter(Boolean)], newPalette.count),
    )
    newPalette.colors = [...INITIAL_COLORS]
  }
</script>

<form class="new-palette" action="#" {onsubmit}>
  <h3>New palette</h3>

  <label>
    <span>Palette name</span>
    <input type="text" bind:value={newPalette.name} />
  </label>
  <label>
    <span>Color count</span>
    <input type="number" min="5" max="20" step="1" bind:value={newPalette.count} />
  </label>
  <label>
    <span>Colors<br /><small>Add up to three colors for a single palette.</small></span>
    <div>
      {#each newPalette.colors as _, i}
        <div class="color-input">
          <input type="text" bind:value={newPalette.colors[i]} />
          <input
            type="color"
            oninput={(e) => (newPalette.colors[i] = e.currentTarget.value)}
            value={formatHex(parse(newPalette.colors[i]))}
          />
        </div>
      {/each}
    </div>
    <!-- <div class="color-input">
      <input type="text" />
      <input bind:value={newPalette.color} type="color" />
    </div> -->
  </label>

  <div class="actions">
    <button disabled={!canSubmit} class="@button" type="submit">Add palette +</button>
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
    padding: 1.5rem 2rem;
    gap: 1rem;

    input[type='color'] {
      height: 2.25rem;
    }

    label {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
      span {
        width: 10rem;
      }
    }
    .color-input {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      input[type='text'] {
        width: 14ch;
      }
    }
  }
</style>
