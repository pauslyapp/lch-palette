<script lang="ts">
  import type { Swatch } from '$lib/palette/Swatch.svelte'
  import { formatLch } from '$lib/palette/utils'
  import { formatHex, oklch } from 'culori'

  const { swatch }: { swatch: Swatch } = $props()

  const fromString = (input: string) => {
    const color = oklch(input)
    if (color && color.h) {
      swatch.color.l = color.l
      swatch.color.c = color.c
      swatch.color.h = color.h
    }
  }
</script>

<div class="editor">
  {#if swatch.isDefined}
    <div class="actions">
      <button class="@button" disabled={!swatch.canMoveLeft} onclick={() => swatch.moveLeft()}
        >&lsaquo; Move left</button
      >
      <button class="@button" disabled={!swatch.canBeRemoved} onclick={() => swatch.remove()}
        >Unpin and reset color</button
      >
      <button class="@button" disabled={!swatch.canMoveRight} onclick={() => swatch.moveRight()}
        >Move right &rsaquo;</button
      >
    </div>
    <div class="values">
      <div class="value">
        <span>Lightness</span>
        <input type="number" bind:value={swatch.color.l} />
        <input type="range" min="0" max="1" step="0.001" bind:value={swatch.color.l} />
      </div>
      <div class="value">
        <span>Chroma</span>
        <input type="number" bind:value={swatch.color.c} />
        <input type="range" min="0" max="0.3" step="0.001" bind:value={swatch.color.c} />
      </div>
      <div class="value">
        <span>Hue</span>
        <input type="number" bind:value={swatch.color.h} />
        <input type="range" min="0" max="360" step="0.01" bind:value={swatch.color.h} />
      </div>
    </div>
  {:else}
    <button class="@button" onclick={() => swatch.add()}>Pin this color</button>
  {/if}
  <div class="formats">
    <span
      ><input
        type="text"
        value={formatHex(swatch.color)}
        onchange={(e) => fromString(e.currentTarget.value)}
      /></span
    >
    <span
      ><input
        type="text"
        value={formatLch(swatch.color)}
        onchange={(e) => fromString(e.currentTarget.value)}
      /></span
    >
  </div>
</div>

<style lang="postcss">
  .editor {
  }
  .values {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.5rem;
    margin-block: 0.5rem;
  }
  .value {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    input[type='number'] {
      width: 6rem;
    }
  }
  .formats {
    span {
      display: inline-block;
      font-family: monospace;
      border: 1px solid #0002;
      border-radius: 0.125rem;
      padding: 0.25rem 0.5rem;
      background-color: #0001;
    }
  }
</style>
