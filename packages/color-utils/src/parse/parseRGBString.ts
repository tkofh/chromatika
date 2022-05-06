import { RGB } from '@chromatika/types'

const rgbPattern = /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/i

/**
 * parseRGBString turns the string representation of a CSS rgb color into an RGB object
 *
 * When normalize is turned on, rgb(255, 255, 255) turns into { red: 1, green: 1, blue: 1 }.
 * When it is turned off, rgb(255, 255, 255) turns into { red: 255, green: 255, blue 255 }.
 *
 * @param rgb input string representing a CSS rgb color
 * @param normalize whether or not to normalize the numerical output
 */
export const parseRGBString = (rgb: string, normalize = true): RGB => {
  const result = rgbPattern.exec(rgb)
  if (result === null) {
    throw new Error(`Invalid RGB ${rgb}: Input must be a valid CSS RGB String`)
  }

  const [, redString, greenString, blueString] = result

  const scalar = normalize ? 1 / 255 : 1

  return {
    red: parseInt(redString) * scalar,
    green: parseInt(greenString) * scalar,
    blue: parseInt(blueString) * scalar,
  }
}
