import { RGBA } from '@chromatika/types'
import { RGBA_PATTERN, RGB_PATTERN } from '../constants'

/**
 * parseRGBString turns the string representation of a CSS rgb color into an RGB object.
 *
 * When normalize is true, rgb(255, 255, 255) turns into { red: 1, green: 1, blue: 1 }.
 * When it is false, rgb(255, 255, 255) turns into { red: 255, green: 255, blue 255 }.
 *
 * @param rgb input string representing a CSS rgb color
 * @param normalize whether or not to normalize the numerical output
 */
export const parseRGBString = (rgb: string, normalize = false): RGBA => {
  let result = new RegExp(RGB_PATTERN).exec(rgb)
  let isRGBA = false
  if(result === null) {
    result = new RegExp(RGBA_PATTERN).exec(rgb)
    isRGBA = true
  }
  if (result === null) {
    throw new Error(`Invalid RGB ${rgb}: Input must be a valid CSS RGB String`)
  }

  const [, redString, greenString, blueString] = result
  const alphaString = isRGBA ? result[4] : '1.0'

  const scalar = normalize ? 1 / 255 : 1

  return {
    red: parseInt(redString) * scalar,
    green: parseInt(greenString) * scalar,
    blue: parseInt(blueString) * scalar,
    alpha: parseFloat(alphaString),
  }
}
