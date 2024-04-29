import { getContext, setContext } from 'svelte'
import { Library } from './Library.svelte'
import { persistedState } from '$lib/persisted-state.svelte'
import { z } from 'zod'

const key = {}

type ColorScheme = 'light' | 'dark'

type Settings = {
  /** Whether colors should be shown in rgb */
  showInRgb: false
  colorScheme: ColorScheme
}

type PaletteContext = {
  settings: Settings
  library: Library
}

export const createPaletteContext = (): PaletteContext => {
  const settings = persistedState(
    'export-settings',
    z.object({
      showInRgb: z.boolean(),
      colorScheme: z.enum(['light', 'dark']),
    }),
    { showInRgb: false, colorScheme: 'light' },
  )

  const library = $state(new Library())

  const context = $state({
    settings,
    library,
  } as PaletteContext)
  setContext(key, context)
  return context
}

export const getPaletteContext = (): PaletteContext => getContext<PaletteContext>(key)
