import { browser } from '$app/environment'
import { replaceState } from '$app/navigation'
import { page } from '$app/stores'
import { get } from 'svelte/store'
import { Palette, serializedPaletteSchema, type SerializedPalette } from './Palette.svelte'
import { debounce } from 'lodash-es'

export class Library {
  palettes: Palette[] = $state([])

  needsSaving = $derived.by(() => this.#restoredJson !== this.#updatedJson)

  #restoredJson = $state('')
  #updatedJson = $state('')

  constructor() {
    if (browser) {
      this.#restore()

      const debouncedUrlUpdate = debounce((base64: string) => replaceState(`#${base64}`, {}), 100, {
        trailing: true,
      })
      $effect(() => {
        const serialized = this.palettes.map((palette) => palette.serialize())
        this.#updatedJson = JSON.stringify(serialized)
        const base64 = btoa(this.#updatedJson)
        // Using history instead of svelte kit because there is an error in v5
        // at the moment.
        debouncedUrlUpdate(base64)
      })
    }
  }

  save() {
    window.alert('Bookmark this page to save the palette')
  }
  reset() {
    if (this.#restoredJson) {
      this.#restore()
    }
  }
  #restore() {
    try {
      if (!this.#restoredJson) {
        const base64Encoded = get(page).url.hash.replace(/^#/, '')
        if (!base64Encoded) return

        const storedPalettes = atob(base64Encoded)

        this.#restoredJson = storedPalettes
      }

      const parsed = JSON.parse(this.#restoredJson) as SerializedPalette[]
      this.palettes = []
      if (!Array.isArray(parsed)) throw 'Data stored is not an arary.'

      for (const palette of parsed) {
        if (!serializedPaletteSchema.safeParse(palette).success) {
          console.warn('Invalid palette', palette)
          continue
        }
        this.palettes.push(
          new Palette(
            palette.name,
            palette.colors.map(([i, color]) => [
              i,
              { mode: 'oklch', l: color[0], c: color[1], h: color[2] },
            ]),
            palette.count,
          ),
        )
      }
    } catch (e) {
      console.error('Unable to load stored palettes', e)
    }
  }

  removePalette(palette: Palette) {
    this.palettes = this.palettes.filter((p) => p !== palette)
  }

  duplicatePalette(palette: Palette) {
    this.palettes.splice(
      this.palettes.indexOf(palette) + 1,
      0,
      new Palette(palette.name, palette.definedColors, palette.colorCount),
    )
  }
}
