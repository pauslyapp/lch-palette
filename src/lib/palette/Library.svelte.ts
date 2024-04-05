import { browser } from '$app/environment'
import { Palette, type SerializedPalette } from './Palette.svelte'

export class Library {
  palettes: Palette[] = $state([])

  #storageKey = 'palettes'

  needsSaving = $derived.by(() => this.#storedJson !== this.#updatedJson)

  #storedJson = $state('')
  #updatedJson = $state('')

  constructor() {
    if (browser) {
      const storedPalettes = localStorage.getItem(this.#storageKey)

      if (storedPalettes) {
        this.#storedJson = storedPalettes
        this.#restore()
      }
      $effect(() => {
        const serialized = this.palettes.map((palette) => palette.serialize())
        this.#updatedJson = JSON.stringify(serialized)
      })
    }
  }

  save() {
    if (this.#updatedJson) {
      localStorage.setItem(this.#storageKey, this.#updatedJson)
      this.#storedJson = this.#updatedJson
    }
  }
  reset() {
    if (this.#storedJson) {
      this.#restore()
    }
  }
  #restore() {
    try {
      const parsed = JSON.parse(this.#storedJson) as SerializedPalette[]
      this.palettes = []
      for (const palette of parsed) {
        this.palettes.push(new Palette(palette.colors, palette.count))
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
      new Palette(palette.definedColors, palette.colorCount),
    )
  }
}
