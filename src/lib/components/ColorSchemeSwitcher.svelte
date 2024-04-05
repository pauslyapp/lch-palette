<script lang="ts">
  // import { createTestPalettes } from '$lib/palette/test'

  const key = 'color-scheme'

  type ColorScheme = 'light' | 'dark'

  let scheme = $state<ColorScheme>((window.localStorage.getItem(key) as ColorScheme) || 'light')

  const toggleColorScheme = () => {
    scheme = scheme === 'light' ? 'dark' : 'light'
  }

  $effect(() => {
    document.documentElement.dataset['scheme'] = scheme
    window.localStorage.setItem(key, scheme)
  })
</script>

<button class="@button" onclick={() => toggleColorScheme()}
  >{scheme === 'light' ? '🌚 Dark mode' : '🌞 Light mode'}</button
>
