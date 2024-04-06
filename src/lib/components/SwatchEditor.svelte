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

<div
  class="editor"
  style:--l={swatch.color.l}
  style:--c={swatch.color.c}
  style:--h={swatch.color.h}
>
  {#if swatch.isDefined}
    <div class="actions">
      <button class="@button" disabled={!swatch.canMoveLeft} onclick={() => swatch.moveLeft()}
        >&lsaquo; Move left</button
      >
      <button class="@button" disabled={!swatch.canBeRemoved} onclick={() => swatch.remove()}
        >Unpin and reset color ⛔️</button
      >
      <button class="@button" disabled={!swatch.canMoveRight} onclick={() => swatch.moveRight()}
        >Move right &rsaquo;</button
      >
    </div>
    <div class="values">
      <div class="value lightness">
        <span>Lightness</span>
        <input type="number" bind:value={swatch.color.l} />
        <div class="range">
          <input type="range" min="0" max="1" step="0.001" bind:value={swatch.color.l} />
        </div>
      </div>
      <div class="value chroma">
        <span>Chroma</span>
        <input type="number" bind:value={swatch.color.c} />
        <div class="range">
          <input type="range" min="0" max="0.3" step="0.001" bind:value={swatch.color.c} />
        </div>
      </div>
      <div class="value hue">
        <span>Hue</span>
        <input type="number" bind:value={swatch.color.h} />
        <div class="range">
          <input type="range" min="0" max="360" step="0.01" bind:value={swatch.color.h} />
        </div>
      </div>
    </div>
  {:else}
    <div class="actions">
      <button class="@button" onclick={() => swatch.add()}>Pin this color</button>
    </div>
  {/if}
  <div class="formats">
    <span class="hex">
      Hex <input
        type="text"
        value={formatHex(swatch.color)}
        onchange={(e) => fromString(e.currentTarget.value)}
      /></span
    >
    <span class="oklch">
      Oklch
      <input
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
  .actions {
    justify-content: center;
    margin-block: 1rem;
  }
  .values {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.5rem;
    margin-block: 0.5rem;
    padding: 1rem;
    background: var(--color-bg-secondary);
    border-radius: 0.25rem;
  }
  .value {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    input[type='number'] {
      width: 6rem;
    }

    .range {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      input {
        width: 100%;
      }
      &::after {
        content: '';
        height: 1rem;
        border-radius: 0.25rem;
        visibility: hidden;
      }
      &:hover::after {
        visibility: visible;
      }
    }

    &.hue .range::after {
      background: linear-gradient(
        to right in oklch longer hue,
        oklch(0.65 0.25 0) 0%,
        oklch(0.65 0.25 360)
      );
    }
    &.lightness .range::after {
      background: linear-gradient(
        to right in oklch,
        oklch(0 var(--c) var(--h)),
        oklch(0.5 var(--c) var(--h)),
        oklch(1 var(--c) var(--h))
      );
    }
    &.chroma .range::after {
      background: linear-gradient(
        to right in oklch,
        oklch(0.6 0.01 var(--h)),
        oklch(0.6 0.3 var(--h))
      );
    }
  }
  /* .slider-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      .hue-preview {
        height: 1rem;
        border-radius: 0.25rem;
        background: linear-gradient(
          to right in oklch longer hue,
          oklch(0.6 0.2 0) 0%,
          oklch(0.6 0.2 360)
        );
      }
    } */
  .formats {
    span {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: monospace;
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: var(--color-bg-secondary);
    }
    .hex {
      input {
        width: 8ch;
      }
    }
    .oklch {
      input {
        width: 30ch;
      }
    }
  }
</style>
