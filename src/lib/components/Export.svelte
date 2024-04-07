<script lang="ts">
  import { getPaletteContext } from '$lib/palette/context.svelte'
  import { formatLch } from '$lib/palette/utils'
  import { persistedState } from '$lib/persisted-state.svelte'
  import { formatHex, formatHsl } from 'culori'
  import z from 'zod'
  import Modal from './Modal.svelte'

  const { onclose }: { onclose: () => void } = $props()

  const { library } = getPaletteContext()

  const settings = persistedState(
    'export-settings',
    z.object({
      colorFormat: z.enum(['oklch', 'hsl', 'hex']),
      exportFormat: z.enum(['plain', 'css', 'css-material', 'js', 'figma']),
    }),
    { colorFormat: 'oklch', exportFormat: 'plain' },
  )

  let timeoutId: number
  const copyToClipboard = () => {
    clearTimeout(timeoutId)
    navigator.clipboard.writeText(exportText)
    copied = true
    timeoutId = setTimeout(() => (copied = false), 200)
  }

  let copied = $state(false)

  const getExportText = () => {
    let exportString = ''
    const { colorFormat, exportFormat } = settings

    switch (exportFormat) {
      case 'js':
        exportString = `
export const colors = {`
        break
      case 'figma':
        exportString = `{
  "color": {`
        break
    }

    let i = 0
    for (const palette of library.palettes) {
      let colors: string[] = []
      for (const swatch of palette.swatches) {
        let formattedColor
        switch (colorFormat) {
          case 'oklch':
            formattedColor = formatLch(swatch.color)
            break
          case 'hex':
            formattedColor = formatHex(swatch.color)
            break
          case 'hsl':
            formattedColor = formatHsl(swatch.color)
            break
        }

        colors.push(formattedColor)
      }
      const colorName = palette.name.toLowerCase()
      switch (exportFormat) {
        case 'plain':
          exportString += colors.join('\n') + '\n\n'
          break
        case 'css':
          exportString +=
            colors.map((color, i) => `--color-${colorName}-${i + 1}: ${color};`).join('\n') + '\n\n'
          break
        case 'css-material':
          exportString +=
            colors
              .map((color, i) => `--color-${colorName}-${i === 0 ? '50' : i * 100}: ${color};`)
              .join('\n') + '\n\n'
          break
        case 'js':
          exportString +=
            `\n  '${colorName}': [\n` +
            colors.map((color) => `    '${color}'`).join(',\n') +
            `\n  ],`
          break
        case 'figma':
          exportString +=
            `${i !== 0 ? ',' : ''}\n    "${colorName}": {\n` +
            colors
              .map((color, i) => `      "${i + 1}": {"$type":"color", "$value":"${color}"}`)
              .join(',\n') +
            `\n    }`
          break
      }
      i++
    }

    switch (exportFormat) {
      case 'js':
        exportString += `\n}\n\n`
        break
      case 'figma':
        exportString += `\n  }\n}\n`
        break
    }

    return exportString
  }

  let exportText = $derived(getExportText())
</script>

<Modal {onclose}>
  <code class="exported-text">{exportText}</code>

  {#snippet options()}
    <label>
      Color format
      <select bind:value={settings.colorFormat}>
        <option value="oklch">Oklch</option>
        <option value="hsl">Hsl</option>
        <option value="hex">Hex</option>
      </select>
    </label>
    <label>
      Export format
      <select bind:value={settings.exportFormat}>
        <option value="plain">Plain colors</option>
        <option value="css">CSS Variables (1, 2, 3, ...)</option>
        <option value="css-material">CSS Variables (50, 100, 200, ...)</option>
        <option value="js">JavaScript</option>
        <option value="figma">Figma (Design Tokens Format)</option>
      </select>
    </label>
  {/snippet}

  {#snippet actions()}
    <button class="@button" onclick={copyToClipboard}>
      📋 Copy to clipboard {#if copied}✅{/if}
    </button>
  {/snippet}
</Modal>

<style lang="postcss">
  .exported-text {
    display: block;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background: var(--color-bg-secondary);
    padding: 1rem 1.5rem;
    max-width: 90vw;
    height: 100%;
    overflow: scroll;
    font-size: 0.75rem;
    font-family: monospace;
    white-space: pre;
  }
</style>
