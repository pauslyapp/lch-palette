import type { Oklch } from 'culori'

export const formatLch = (lch: Oklch | undefined) =>
  `oklch(${round((lch?.l ?? 0) * 100, 4)}% ${round(lch?.c ?? 0, 4)} ${round(lch?.h ?? 0, 4)})`

export const round = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision
