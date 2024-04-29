<script lang="ts">
  import { getPaletteContext } from '$lib/palette/context.svelte'

  const { settings } = getPaletteContext()

  const toggleColorScheme = () => {
    settings.colorScheme = settings.colorScheme === 'light' ? 'dark' : 'light'
  }

  $effect(() => {
    document.documentElement.dataset['scheme'] = settings.colorScheme
  })
</script>

<button class="@button" onclick={() => toggleColorScheme()}
  >{settings.colorScheme === 'light' ? '🌚 Dark mode' : '🌞 Light mode'}</button
>
