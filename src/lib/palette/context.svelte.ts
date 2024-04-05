import { getContext, setContext } from 'svelte'
import { Library } from './Library.svelte'

const key = {}

type PaletteContext = {
  settings: {
    /** Whether colors should be shown in rgb */
    showInRgb: false
  }
  library: Library
}

export const createPaletteContext = (): PaletteContext => {
  const context = $state({
    settings: { showInRgb: false },
    library: new Library(),
  } as PaletteContext)
  setContext(key, context)
  return context
}

export const getPaletteContext = (): PaletteContext => getContext<PaletteContext>(key)
