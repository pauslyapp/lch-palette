<script lang="ts">
  import { beforeNavigate } from '$app/navigation'
  import { createPaletteContext } from '$lib/palette/context.svelte'
  import '$lib/styles/app.css'

  const { children } = $props()

  const { library } = createPaletteContext()

  beforeNavigate(({ cancel }) => {
    if (library.needsSaving) {
      window.confirm('You have unsaved changes. Are you sure you want to leave?') || cancel()
    }
  })
</script>

<svelte:head>
  <meta name="color-scheme" content="light " />
</svelte:head>

<main>
  {@render children()}
</main>

<style lang="postcss">
  main {
    width: 60rem;
    max-width: 100%;
    padding: 1rem;
    margin-inline: auto;
    padding-inline: 3rem;
  }
</style>
