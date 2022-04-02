import { lerp } from './lerp'
import { normalize } from './normalize'

export const remap = (
  value: number,
  sourceStart: number,
  sourceEnd: number,
  targetStart: number,
  targetEnd: number,
  clamp = true
) => {
  if (sourceStart === sourceEnd) {
    throw new Error('Cannot remap a range of 0, source range start and end must be different')
  }

  if (targetStart === targetEnd) {
    return targetStart
  }

  return lerp(normalize(value, sourceStart, sourceEnd), targetStart, targetEnd, clamp)
}
