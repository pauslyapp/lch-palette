import { oklch } from 'culori'
import { Palette } from './Palette.svelte'

export const createTestPalettes = () => {
  const palettes: Palette[] = []

  palettes.push(Palette.fromColors(['oklch(97% 0.0301 159.2139)', '#30FFAA'], 12))

  palettes.push(
    new Palette(
      [
        [0, oklch('#FFFDED')!],
        [2, oklch('#FDE86E')!],
        [8, oklch('oklch(50.2018% 0.4054 99.5457)')!],
      ],
      12,
    ),
  )

  palettes.push(Palette.fromColors(['#FFADAE'], 12))
  palettes.push(Palette.fromColors(['#0755E4'], 12))
  palettes.push(Palette.fromColors(['#facc15'], 12))
  palettes.push(Palette.fromColors(['#f43f5e'], 12))
  palettes.push(Palette.fromColors(['#3b82f6'], 12))

  return palettes
}
