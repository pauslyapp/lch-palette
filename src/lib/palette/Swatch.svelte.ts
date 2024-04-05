import type { Oklch } from 'culori'
import type { Palette } from './Palette.svelte'

export class Swatch {
  #palette: Palette

  index = $state(0)

  isDefined = $state(false)

  get isSelected() {
    return this.#palette.selectedSwatchIndex === this.index
  }

  get definedColor() {
    if (!this.isDefined) return null
    return this.#palette.definedColors.find(([index]) => index === this.index)
  }

  color = $state<Oklch>({ mode: 'oklch', l: 0, c: 0, h: 0 })

  canBeMovedLeft = $derived.by(
    () =>
      this.index !== 0 && !this.#palette.definedColors.find(([index]) => index === this.index - 1),
  )
  canBeRemoved = $derived.by(() => this.#palette.definedColors.length > 1)
  canBeMovedRight = $derived.by(
    () =>
      this.index < this.#palette.colorCount - 1 &&
      !this.#palette.definedColors.find(([index]) => index === this.index + 1),
  )

  constructor(Palette: Palette, index: number, color: Oklch, isDefined: boolean) {
    this.#palette = Palette
    this.index = index
    this.isDefined = isDefined
    this.color = color
  }

  remove() {
    this.#palette.removeColor(this.index)
  }
  add() {
    if (this.isDefined) return
    this.#palette.defineColor(this.index, this.color)
  }
  moveLeft() {
    if (this.definedColor) {
      this.definedColor[0]--
    }
  }
  moveRight() {
    if (this.definedColor) {
      this.definedColor[0]++
    }
  }
  select() {
    this.#palette.selectedSwatchIndex = this.index
  }
  deselect() {
    this.#palette.selectedSwatchIndex = -1
  }
}
