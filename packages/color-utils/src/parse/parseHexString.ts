import { RGB } from '@chromatika/types'

const shorthandHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
const expandedHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

/**
 * parseHexString turns the string representation of a CSS hex code into an RGB object
 *
 * When normalize is turned on, #fff turns into { red: 1, green: 1, blue: 1 }.
 * When it is turned off, #fff turns into { red: 255, green: 255, blue 255 }.
 *
 * @param hex input string representing a CSS hex code
 * @param normalize whether or not to normalize the numerical output
 */
export const parseHexString = (hex: string, normalize = true): RGB => {
  if (!shorthandHexPattern.test(hex) && !expandedHexPattern.test(hex)) {
    throw new Error(
      `Invalid hex code ${hex}: Please use a valid hex code (including the # at the start`
    )
  }

  const expandedHex = hex.replace(
    shorthandHexPattern,
    (_, red, green, blue) => red + red + green + green + blue + blue
  )

  const [, redString, greenString, blueString] = expandedHexPattern.exec(expandedHex)!

  const scalar = normalize ? 1 / 255 : 1

  return {
    red: parseInt(redString, 16) * scalar,
    green: parseInt(greenString, 16) * scalar,
    blue: parseInt(blueString, 16) * scalar,
  }
}
