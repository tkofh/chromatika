import { clamp as _clamp, lerp } from 'micro-math'
import { throwResultantErrors } from '../../util'
import { tryParseNumber } from './parseNumber'
import { tryParsePercentage } from './parsePercentage'

export const tryParseRGBChannel = (channel: string, clamp = true): number | Error => {
  let result: number | Error = tryParseNumber(channel)
  if (typeof result === 'number') {
    if (clamp) {
      result = _clamp(result, 0, 255)
    }
  } else {
    result = tryParsePercentage(channel, true, true)
    if (typeof result === 'number') {
      result = lerp(result, 0, 255, clamp)
    }
  }

  if (typeof result === 'number') {
    result = Math.round(result)
  }

  return result
}

export const parseRGBChannel = throwResultantErrors(tryParseRGBChannel)
