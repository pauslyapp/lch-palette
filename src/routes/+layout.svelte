<script lang="ts">
  import { createPaletteContext } from '$lib/palette/context.svelte'
  import '$lib/styles/app.css'

  const { children } = $props()

  createPaletteContext()
</script>

<svelte:head>
  <title>Oklch Palette Generator</title>
</svelte:head>

<main>
  {@render children()}
</main>

<style lang="postcss">
  main {
    width: 60rem;
    max-width: 100%;
    margin-inline: auto;
    padding-inline: 1rem;
    padding-block: 1rem 10rem;
  }
</style>
