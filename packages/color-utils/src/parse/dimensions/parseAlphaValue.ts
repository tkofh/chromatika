import { clamp as _clamp } from 'micro-math'
import { throwResultantErrors } from '../../util'
import { tryParseNumber } from './parseNumber'
import { tryParsePercentage } from './parsePercentage'

export const tryParseAlphaValue = (alpha: string, clamp = true): number | Error => {
  let result: number | Error = tryParseNumber(alpha)
  if (result instanceof Error) {
    result = tryParsePercentage(alpha, clamp, true)
  } else if (clamp) {
    result = _clamp(result, 0, 1)
  }
  if (result instanceof Error) {
    result = new Error(`Cannot parse alpha ${alpha}`)
  }

  return result
}

export const parseAlphaValue = throwResultantErrors(tryParseAlphaValue)
