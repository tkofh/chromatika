import { mod as _mod } from 'micro-math'
import { throwResultantErrors } from '../../util'
import { tryParseAngle } from './parseAngle'
import { tryParseNumber } from './parseNumber'

export const tryParseHue = (alpha: string): number | Error => {
  let result: number | Error = tryParseAngle(alpha, 'deg', true)
  if (result instanceof Error) {
    result = tryParseNumber(alpha)
  }
  if (result instanceof Error) {
    result = new Error(`Cannot parse alpha ${alpha}`)
  } else {
    result = _mod(Math.round(result), 0, 360, 'max')
  }

  return result
}

export const parseHue = throwResultantErrors(tryParseHue)
