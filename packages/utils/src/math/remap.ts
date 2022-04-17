import { lerp } from './lerp'
import { normalize } from './normalize'
import { roundTo } from './roundTo'

export const remap = (
  value: number,
  sourceStart: number,
  sourceEnd: number,
  targetStart: number,
  targetEnd: number,
  clamp = true,
  precision?: number
) => {
  if (sourceStart === sourceEnd) {
    throw new Error('Cannot remap a range of 0, source range start and end must be different')
  }

  if (targetStart === targetEnd) {
    return targetStart
  }

  let normalized = normalize(value, sourceStart, sourceEnd)

  if (precision !== undefined) {
    normalized = roundTo(normalized, precision)
  }

  let remapped = lerp(normalized, targetStart, targetEnd, clamp)

  if (precision !== undefined) {
    remapped = roundTo(remapped, precision)
  }

  return remapped
}
