<script lang="ts">
  import type { Swatch } from '$lib/palette/Swatch.svelte'
  import { formatLch } from '$lib/palette/utils'
  import { formatHex } from 'culori'

  const { swatch }: { swatch: Swatch } = $props()

  let hex = false
</script>

<div
  class="swatch"
  class:defined={swatch.isDefined}
  style:--bg={(hex ? formatHex : formatLch)(swatch.color)}
>
  <div class="tools">
    {#if swatch.isDefined}
      <button disabled={!swatch.canBeMovedLeft} onclick={() => swatch.moveLeft()}>&lt;</button>
      <button disabled={!swatch.canBeRemoved} onclick={() => swatch.remove()}>Remove</button>
      <button disabled={!swatch.canBeMovedRight} onclick={() => swatch.moveRight()}>&gt;</button>
      <div class="value">
        <span>Lightness</span>
        <input type="number" min="0" max="1" step="0.01" bind:value={swatch.color.l} />
        <input type="range" min="0" max="1" step="0.01" bind:value={swatch.color.l} />
      </div>
      <div class="value">
        <span>Chroma</span>
        <input type="number" min="0" max="0.3" step="0.01" bind:value={swatch.color.c} />
        <input type="range" min="0" max="0.3" step="0.01" bind:value={swatch.color.c} />
      </div>
      <div class="value">
        <span>Hue</span>
        <input type="number" min="0" max="360" step="0.1" bind:value={swatch.color.h} />
        <input type="range" min="0" max="360" step="0.1" bind:value={swatch.color.h} />
      </div>
    {:else}
      <button onclick={() => swatch.add()}>Set</button>
    {/if}
  </div>
</div>

<style lang="postcss">
  .swatch {
    position: relative;
    padding: 0;
    display: inline-block;
    position: relative;
    flex: 1;
    /* border: 1px solid #0001; */
    background-color: var(--bg);
    height: 4rem;

    &:hover {
      .tools {
        display: block;
      }
    }

    &.defined {
      &::after {
        position: absolute;
        /* top: calc(-100% + 1rem); */
        top: -1.3rem;
        left: 50%;
        translate: -50% 0;
        content: '⌄';
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 1rem;
      }
    }
    &:not(:first) {
      margin-left: -1px;
    }
  }
  .tools {
    z-index: 10;
    display: none;
    position: absolute;
    top: calc(100% - 0.1rem);
    left: 0;
    background: white;
    padding: 0.5rem;
    border: 1px solid #0001;
    border-radius: 0.25rem;
  }
</style>
