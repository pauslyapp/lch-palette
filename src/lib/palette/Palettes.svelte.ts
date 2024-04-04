import { browser } from '$app/environment'
import { Palette, type SerializedPalette } from './Palette.svelte'

export class Palettes {
  palettes: Palette[] = $state([])

  #storageKey = 'palettes'

  constructor() {
    if (browser) {
      try {
        const storedPalettes = localStorage.getItem(this.#storageKey)

        if (storedPalettes) {
          const parsed = JSON.parse(storedPalettes) as SerializedPalette[]
          for (const palette of parsed) {
            this.palettes.push(new Palette(palette.colors, palette.count))
          }
        }
      } catch (e) {
        console.error('Unable to load stored palettes', e)
      }
      $effect(() => {
        const serialized = this.palettes.map((palette) => palette.serialize())
        localStorage.setItem(this.#storageKey, JSON.stringify(serialized))
      })
    }
  }

  removePalette(palette: Palette) {
    this.palettes = this.palettes.filter((p) => p !== palette)
  }
}
