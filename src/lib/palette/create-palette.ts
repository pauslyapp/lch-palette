import { oklch, type Oklch } from 'culori'
import { CurveInterpolator } from 'curve-interpolator'
import type { DefinedColor, SwatchColor } from './Palette.svelte'

const getIdealLigthnessCurve = (colorCount: number) => {
  return new CurveInterpolator(
    [
      [0, 0.97],
      [1, 0.93],
      [colorCount - 2, 0.26],
      [colorCount - 1, 0.22],
    ],
    { tension: 0.1, alpha: 0.9 },
  )
}

export const IDEAL_CHROMA_RATIO = 0.2

export const getMaxChroma = (l: number, c: number) => c / Math.sin(l * Math.PI)

/**
 * `maxChroma` ist not necessarily reached, but is the chroma reached at 0.5
 * lightness.
 */
export const chromaFunction = (l: number, maxChroma: number) => {
  return Math.sin(l * Math.PI) * maxChroma
}

/**
 * The returns the index in the palette, where this `color` fits best based on
 * lightness (and color count).
 */
const getClosestIndex = (color: Oklch, colorCount: number) => {
  const idealLightnessCurve = getIdealLigthnessCurve(colorCount)
  return Array.from({ length: colorCount })
    .map((_, i) => idealLightnessCurve.getPointAt(i / (colorCount - 1))[1])
    .reduce(
      (acc, lightness, index) => {
        const distance = Math.abs(color.l - lightness)
        if (distance < acc.distance) {
          return { distance, index }
        }
        return acc
      },
      { distance: Infinity, index: 0 },
    ).index
}

export const createDefinedColors = (
  definedColors: string[],
  colorCount: number,
): DefinedColor[] => {
  const colors = definedColors
    .map((color) => oklch(color))
    .filter((color): color is Oklch => !!color)
  if (colors.length === 0) return []
  console.log(
    'hi',
    colors.map((color) => [getClosestIndex(color, colorCount), color]),
  )
  return colors.map((color) => [getClosestIndex(color, colorCount), color])
}

const getUndefinedPalette = (colorCount: number) =>
  Array.from({ length: colorCount }).map(() => ({
    defined: false,
    color: { mode: 'oklch', h: 0, l: 0.5, c: 0 } as Oklch,
  }))

/** Takes a list of defined colors, and builds a palette with a gradient. */
export const createPalette = (definedColors: DefinedColor[], colorCount: number): SwatchColor[] => {
  if (definedColors.length === 0) return getUndefinedPalette(colorCount)

  const firstDefined = definedColors[0]![1]
  const lastDefined = definedColors[definedColors.length - 1]![1]

  const lastIndex = colorCount - 1

  const isFirstDefined = !!definedColors.find(([index]) => index === 0)
  const isLastDefined = !!definedColors.find(([index]) => index === colorCount - 1)

  const huePoints = definedColors.map(([index, color]) => [index, color.h!])

  const lightnessPoints = definedColors.map(([index, color]) => [index, color.l])

  if (!isFirstDefined) {
    lightnessPoints.unshift([0, 0.97], [1, 0.935])
    huePoints.unshift([0, firstDefined.h!])
  }
  if (!isLastDefined) {
    lightnessPoints.push([lastIndex - 1, 0.33], [lastIndex, 0.2])
    huePoints.push([lastIndex, lastDefined.h!])
  }

  const hueInterpolator = new CurveInterpolator(huePoints, {
    tension: 0.0,
    alpha: 0.5,
  })

  const lightnessInterpolator = new CurveInterpolator(lightnessPoints, {
    tension: 0.0,
    alpha: 0.5,
  })

  const firstDefinedColorRatio = getMaxChroma(firstDefined.l, firstDefined.c)
  const lastDefinedColorRatio = getMaxChroma(lastDefined.l, lastDefined.c)

  const idealChromaRatioFunction = (i: number, colorCount: number) => {
    const ratioStart = Math.min(
      firstDefinedColorRatio,
      isFirstDefined ? getMaxChroma(firstDefined!.l, firstDefined!.c) : IDEAL_CHROMA_RATIO,
    )

    const ratioEnd = Math.min(
      lastDefinedColorRatio,
      isLastDefined ? getMaxChroma(lastDefined!.l, lastDefined!.c) : IDEAL_CHROMA_RATIO,
    )

    return ratioStart + (ratioEnd - ratioStart) * (i / (colorCount - 1))
  }

  const filledColors = Array.from({ length: colorCount }).map(
    (_, i): { color: Oklch; defined: boolean } => {
      const definedColor = definedColors.find(([index]) => index === i)?.[1]

      if (definedColor) {
        return { color: definedColor, defined: true }
      }

      // Not a defined color, so lets interpolate

      // Lightness and hue are easy. We just use our interpolators which
      // draw a cubic curve
      const l = lightnessInterpolator.getPointAt(i / (colorCount - 1))[1]!
      const h = hueInterpolator.getPointAt(i / (colorCount - 1))[1]!

      // Chroma is a bit more complicated. We don't simply want to interpolate
      // the chroma, since it is very sensitive to light and dark values.
      // Instead we always base the chroma on the lightness, and make sure that
      // the "ideal" max chroma (used to calculate the chroma for different
      // lightness values) is "ramped" up to the max chroma of the defined
      // colors.

      const weightedChromas = definedColors.map(([index, color]) => {
        const distance = Math.abs(index - i)

        // Handpicked influence values that work well in most scenarios
        const influences = [1, 0.6, 0.3, 0.1]

        return {
          chroma: chromaFunction(l, getMaxChroma(color.l, color.c)),
          influence: influences[distance] ?? 0,
        }
      })

      const summedChromas = weightedChromas.reduce(
        (acc, { chroma, influence }) => ({
          chroma: acc.chroma + chroma * influence,
          totalInfluence: acc.totalInfluence + influence,
          maxChroma: Math.max(acc.maxChroma, chroma),
        }),
        { chroma: 0, totalInfluence: 0, maxChroma: 0 },
      )

      const c = Math.min(
        summedChromas.maxChroma,
        summedChromas.totalInfluence < 1
          ? summedChromas.chroma +
              chromaFunction(l, idealChromaRatioFunction(i, colorCount)) *
                (1 - summedChromas.totalInfluence)
          : summedChromas.chroma / summedChromas.totalInfluence,
      )

      return {
        defined: false,
        color: { mode: 'oklch', h, l, c } as Oklch,
      }
    },
  )

  return filledColors
}
