import { assertHexString } from '../assertions'
import { SHORTHAND_HEX_PATTERN } from '../constants'

/**
 * expandHexString turn abbreviated three character hex codes into their full six character forms.
 *
 * @param hex optionally abbreviated hex code to turn into a six character hex code
 */
export const expandHexString = (hex: string): string => {
  assertHexString(hex, 'hex code')

  return hex.replace(
    SHORTHAND_HEX_PATTERN,
    (_, red, green, blue, alpha) => '#' + red + red + green + green + blue + blue + (alpha ? (alpha + alpha) : '')
  )
}
