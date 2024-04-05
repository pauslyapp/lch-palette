import type { Oklch } from 'culori'
import { Swatch } from './Swatch.svelte'
import { createPalette, createDefinedColors } from './create-palette'

/** The actual colors, defined by the user, by index in the palette */
export type DefinedColor = [number, Oklch]

export type SwatchColor = { color: Oklch; defined: boolean }

export type SerializedPalette = {
  count: number
  colors: [number, Oklch][]
}

export class Palette {
  colorCount = $state(0)
  definedColors = $state<DefinedColor[]>([])

  selectedSwatchIndex = $state(-1)

  swatches = $derived<Swatch[]>(
    createPalette(this.definedColors, this.colorCount).map(
      ({ color, defined }, i) => new Swatch(this, i, color, defined),
    ),
  )

  selectedSwatch = $derived.by(() => this.swatches[this.selectedSwatchIndex])

  constructor(definedColors: DefinedColor[], colorCount: number) {
    this.definedColors = definedColors
    this.colorCount = colorCount
  }

  static fromColors(color: string[], colorCount: number) {
    return new Palette(createDefinedColors(color, colorCount), colorCount)
  }

  defineColor(index: number, color: Oklch) {
    this.definedColors.push([index, color])
    this.definedColors.sort(([a], [b]) => a - b)
  }
  removeColor(index: number) {
    if (this.definedColors.length <= 1) return
    this.definedColors = this.definedColors.filter(([i]) => i !== index)
  }

  deselectAll() {
    this.swatches.forEach((swatch) => swatch.deselect())
  }

  serialize(): SerializedPalette {
    return {
      count: this.swatches.length,
      colors: this.swatches
        .map((swatch, i) => ({ color: swatch.color, isDefined: swatch.isDefined, i }))
        .filter(({ isDefined }) => isDefined)
        .map(({ color, i }) => [i, color]),
    }
  }
}
