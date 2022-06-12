import { RGB } from '@chromatika/types'
import { assertHexString } from '../assertions'
import { EXPANDED_HEX_PATTERN } from '../constants'
import { expandHexString } from '../stringify'

/**
 * parseHexString turns the string representation of a CSS hex code into an RGB object.
 *
 * When normalize is true, #fff turns into { red: 1, green: 1, blue: 1 }.
 * When it is false, #fff turns into { red: 255, green: 255, blue 255 }.
 *
 * @param hex input string representing a CSS hex code
 * @param normalize whether or not to normalize the numerical output
 */
export const parseHexString = (hex: string, normalize = false): RGB => {
  assertHexString(hex, 'hex code')

  const expandedHex = expandHexString(hex)

  const [, redString, greenString, blueString] = EXPANDED_HEX_PATTERN.exec(expandedHex)!

  const scalar = normalize ? 1 / 255 : 1

  return {
    red: parseInt(redString, 16) * scalar,
    green: parseInt(greenString, 16) * scalar,
    blue: parseInt(blueString, 16) * scalar,
  }
}
