import type { Action } from 'svelte/action'

export const clickOutside: Action<HTMLElement, { handleEsc?: boolean } | undefined> = (
  node,
  { handleEsc = true } = {},
) => {
  const clickHandler = (event: MouseEvent) => {
    if (!node.contains(event.target as HTMLElement)) {
      node.dispatchEvent(new CustomEvent('outclick'))
    }
  }

  const escHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      node.dispatchEvent(new CustomEvent('outclick'))
    }
  }

  document.addEventListener('click', clickHandler, true)
  if (handleEsc) {
    document.addEventListener('keydown', escHandler, true)
  }

  return {
    destroy: () => {
      document.removeEventListener('click', clickHandler, true)
      document.removeEventListener('keydown', escHandler, true)
    },
  }
}
