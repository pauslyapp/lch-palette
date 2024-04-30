<script lang="ts">
  import { Palette } from '$lib/palette/Palette.svelte'
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { formatHex, parse } from 'culori'

  const context = getPaletteContext()

  const library = $derived(context.library)

  const INITIAL_COLORS = ['#3b82f6']

  let newPalette = $state({
    name: 'blue',
    colors: [...INITIAL_COLORS],
    count: 12,
  })

  let canSubmit = $derived(newPalette.colors.find(Boolean))

  let error = $state<string>()

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault()
    try {
      library.palettes.push(
        Palette.fromColors(
          newPalette.name,
          [...newPalette.colors.filter(Boolean)],
          newPalette.count,
        ),
      )
      newPalette.colors = [...INITIAL_COLORS]
      error = undefined
    } catch (e) {
      error = `${e}`
    }
  }

  let colorCount = $derived(newPalette.colors.length)
</script>

<form class="new-palette" action="#" {onsubmit}>
  <h3>New palette</h3>

  {#if error}
    <p class="error">
      {error}
    </p>
  {/if}

  <label>
    <span>Palette name</span>
    <input type="text" bind:value={newPalette.name} />
  </label>
  <label>
    <span>Color count</span>
    <input type="number" min="5" max="20" step="1" bind:value={newPalette.count} />
  </label>
  <label>
    <span>Color{colorCount === 1 ? '' : 's'}</span>
    <div>
      {#each newPalette.colors as _, i}
        <div class="color-input">
          <input type="text" bind:value={newPalette.colors[i]} />
          <input
            type="color"
            oninput={(e) => (newPalette.colors[i] = e.currentTarget.value)}
            value={formatHex(parse(newPalette.colors[i]))}
          />
          {#if colorCount > 1}
            <button type="button" class="@button" onclick={() => newPalette.colors.splice(i, 1)}>
              ✖️
            </button>
          {/if}
        </div>
      {/each}
      <button
        type="button"
        class="@button +small"
        onclick={() => newPalette.colors.push(newPalette.colors.at(-1)!)}>Add color</button
      >
    </div>
  </label>

  <div class="@actions +centered">
    <button disabled={!canSubmit} class="@button +large" type="submit">Add palette +</button>
  </div>
</form>

<style lang="postcss">
  form {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-tertiary);
    margin-inline: auto;
    border-radius: 0.5rem;
    width: 28rem;
    max-width: 100%;
    padding: 1.5rem 2rem;
    gap: 1rem;

    input[type='color'] {
      height: 2.25rem;
    }

    label {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1.5rem;
      row-gap: 0.5rem;
      align-items: top;
      margin-bottom: 0.5rem;
      width: 100%;

      span {
        padding-top: 0.25rem;
        width: 7rem;
      }
    }
    .color-input {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 0.25rem;
      input[type='text'] {
        width: 14ch;
      }
    }
  }
</style>
