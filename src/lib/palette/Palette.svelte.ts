import type { Oklch } from 'culori'
import { Swatch } from './Swatch.svelte'
import { createPalette, createDefinedColors } from './create-palette'
import { z } from 'zod'

/** The actual colors, defined by the user, by index in the palette */
export type DefinedColor = [number, Oklch]

export type SwatchColor = { color: Oklch; defined: boolean }

export class Palette {
  name = $state('')
  colorCount = $state(0)
  definedColors = $state<DefinedColor[]>([])

  selectedSwatchIndex = $state(-1)

  swatches = $derived<Swatch[]>(
    createPalette(this.definedColors, this.colorCount).map(
      ({ color, defined }, i) => new Swatch(this, i, color, defined),
    ),
  )

  selectedSwatch = $derived.by(() => this.swatches[this.selectedSwatchIndex])

  constructor(name: string, definedColors: DefinedColor[], colorCount: number) {
    this.name = name
    this.definedColors = definedColors
    this.colorCount = colorCount
  }

  static fromColors(name: string, color: string[], colorCount: number) {
    return new Palette(name, createDefinedColors(color, colorCount), colorCount)
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
      name: this.name,
      count: this.swatches.length,
      colors: this.swatches
        .map((swatch, i) => ({ color: swatch.color, isDefined: swatch.isDefined, i }))
        .filter(({ isDefined }) => isDefined)
        .map(({ color, i }) => [i, [color.l, color.c, color.h ?? 0]]),
    }
  }
}

export const serializedOklchSchema = z.tuple([z.number(), z.number(), z.number()])
export const serializedPaletteSchema = z.object({
  name: z.string(),
  count: z.number(),
  colors: z.array(z.tuple([z.number(), serializedOklchSchema])),
})
export type SerializedPalette = z.infer<typeof serializedPaletteSchema>
