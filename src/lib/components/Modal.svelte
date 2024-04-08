<script lang="ts">
  import { onMount, type Snippet } from 'svelte'

  const {
    onclose,
    header,
    options,
    actions,
    children,
  }: {
    header?: Snippet
    options?: Snippet
    actions?: Snippet
    children: Snippet
    onclose: () => void
  } = $props()

  onMount(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onclose()
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  })
</script>

<div class="modal-wrapper">
  <div class="modal">
    <div class="header">{@render header?.()}</div>
    {#if options}
      <div class="options">{@render options?.()}</div>
    {/if}
    <div class="content">{@render children()}</div>
    <div class="@actions">
      <button class="@button" onclick={onclose}> Close</button>
      {@render actions?.()}
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-wrapper {
    position: fixed;
    inset: 0;
    background-color: var(--color-bg-secondary);
    z-index: 100000;
  }
  .modal {
    display: grid;
    position: absolute;
    grid-template-rows: auto 1fr auto;
    align-items: stretch;
    justify-items: stretch;
    gap: 1rem;
    inset: 1rem;
    border-radius: 1rem;
    background: var(--color-bg);
    padding: 2rem;
    &:has(.options) {
      grid-template-rows: auto auto 1fr auto;
    }

    .header {
      font-weight: bold;
    }
    .options {
      display: grid;
      justify-self: start;
      gap: 0.5rem;
      @supports (grid-template-columns: subgrid) {
        grid-template-columns: auto 1fr;
        & :global(> *) {
          grid-column: 1 / 3;
        }
        & :global(label) {
          display: grid;
          grid-template-columns: subgrid;
          align-items: center;
          gap: 1rem;
        }
      }
      @supports not (grid-template-columns: subgrid) {
        & :global(label) {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
    }

    .content {
      align-self: stretch;
      overflow: hidden;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
</style>
