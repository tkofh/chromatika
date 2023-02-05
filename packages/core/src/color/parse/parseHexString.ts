import { normalize } from 'micro-math'
import type { RGBA } from '../../types'
import { EXPANDED_HEX_PATTERN, SHORTHAND_HEX_PATTERN } from '../constants'
import { throwResultantErrors } from '../util'
import { parseHexChannel } from './dimensions'

/**
 * parseHexString turns the string representation of a CSS hex code into an RGB object.
 *
 * @param hex input string representing a CSS hex code
 */
export const tryParseHexString = (hex: string): RGBA | Error => {
  const execResult = EXPANDED_HEX_PATTERN.exec(hex) ?? SHORTHAND_HEX_PATTERN.exec(hex)
  return execResult === null
    ? new Error(`Cannot parse Hex ${hex}`)
    : {
        red: parseHexChannel(execResult[1]),
        green: parseHexChannel(execResult[2]),
        blue: parseHexChannel(execResult[3]),
        alpha: execResult[4] ? normalize(parseHexChannel(execResult[4]), 0, 255) : 1,
      }
}

export const parseHexString = throwResultantErrors(tryParseHexString)
