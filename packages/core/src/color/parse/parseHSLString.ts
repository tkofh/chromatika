import type { HSLA } from '../../types'
import { HSL_PATTERN, HSL_LEGACY_PATTERN, HSLA_LEGACY_PATTERN } from '../constants'
import { throwResultantErrors } from '../util'
import { parseAlphaValue, parseHue, parsePercentage } from './dimensions'

/**
 * parseHSLString turns the string representation of a CSS hsl color into an HSL object.
 *
 * @param hsl input string representing a CSS hsl color
 */
export const tryParseHSLString = (hsl: string): HSLA | Error => {
  const execResult =
    HSL_PATTERN.exec(hsl) ?? HSL_LEGACY_PATTERN.exec(hsl) ?? HSLA_LEGACY_PATTERN.exec(hsl)

  return execResult === null
    ? new Error(`Cannot parse HSL ${hsl}`)
    : {
        hue: parseHue(execResult[1]),
        saturation: Math.round(parsePercentage(execResult[2], true, false)),
        lightness: Math.round(parsePercentage(execResult[3], true, false)),
        alpha: execResult[4] ? parseAlphaValue(execResult[4]) : 1,
      }
}

export const parseHSLString = throwResultantErrors(tryParseHSLString)
