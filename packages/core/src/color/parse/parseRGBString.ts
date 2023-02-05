import type { RGBA } from '../../types'
import {
  RGB_NUMBER_PATTERN,
  RGB_PERCENTAGE_PATTERN,
  RGB_LEGACY_NUMBER_PATTERN,
  RGBA_LEGACY_NUMBER_PATTERN,
  RGB_LEGACY_PERCENTAGE_PATTERN,
  RGBA_LEGACY_PERCENTAGE_PATTERN,
} from '../constants'
import { throwResultantErrors } from '../util'
import { parseAlphaValue, parseRGBChannel } from './dimensions'

/**
 * parseRGBString turns the string representation of a CSS rgb color into an RGB object.
 *
 * @param rgb input string representing a CSS rgb color
 */
export const tryParseRGBString = (rgb: string): RGBA | Error => {
  const execResult =
    RGB_NUMBER_PATTERN.exec(rgb) ??
    RGB_LEGACY_NUMBER_PATTERN.exec(rgb) ??
    RGBA_LEGACY_NUMBER_PATTERN.exec(rgb) ??
    RGB_PERCENTAGE_PATTERN.exec(rgb) ??
    RGB_LEGACY_PERCENTAGE_PATTERN.exec(rgb) ??
    RGBA_LEGACY_PERCENTAGE_PATTERN.exec(rgb)

  return execResult === null
    ? new Error(`Cannot parse RGB ${rgb}`)
    : {
        red: parseRGBChannel(execResult[1], true),
        green: parseRGBChannel(execResult[2], true),
        blue: parseRGBChannel(execResult[3], true),
        alpha: execResult[4] ? parseAlphaValue(execResult[4], true) : 1,
      }
}

export const parseRGBString = throwResultantErrors(tryParseRGBString)
