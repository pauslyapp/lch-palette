import { oklch } from 'culori'
import { Palette } from './Palette.svelte'

export const createTestPalettes = () => {
  const palettes: Palette[] = []

  palettes.push(Palette.fromColors('test', ['oklch(97% 0.0301 159.2139)', '#30FFAA'], 12))

  palettes.push(
    new Palette(
      'test',
      [
        [0, oklch('#FFFDED')!],
        [2, oklch('#FDE86E')!],
        [8, oklch('oklch(50.2018% 0.4054 99.5457)')!],
      ],
      12,
    ),
  )

  palettes.push(Palette.fromColors('test', ['#FFADAE'], 12))
  palettes.push(Palette.fromColors('test', ['#0755E4'], 12))
  palettes.push(Palette.fromColors('test', ['#facc15'], 12))
  palettes.push(Palette.fromColors('test', ['#f43f5e'], 12))
  palettes.push(Palette.fromColors('test', ['#3b82f6'], 12))

  return palettes
}
