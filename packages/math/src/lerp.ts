import { clamp as _clamp } from './clamp'

export const lerp = (value: number, start: number, end: number, clamp = true) => {
  const raw = (1 - value) * start + value * end
  return clamp ? _clamp(raw, Math.min(start, end), Math.max(start, end)) : raw
}
