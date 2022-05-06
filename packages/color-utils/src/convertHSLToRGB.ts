import { RGB } from '@chromatika/types'

/**
 *  Converts the HSL form of a color to the RGB form of the same color.
 *
 *  Hue should be in degrees, being greater than or equal to 0 and less than 360.
 *  Saturation and Lightness should be normalized, being greater than or equal to 0 and less than or equal to 1.
 *
 * @param hue Hue component of the color to convert. Must be greater than or equal to 0, and less than 360.
 * @param saturation Saturation component of the color to convert. Must be normalized (greater than or equal to 0, less than or equal to 1).
 * @param lightness Lightness component of the color to convert. Must be normalized (greater than or equal to 0, less than or equal to 1).
 */
export const convertHSLToRGB = (hue: number, saturation: number, lightness: number): RGB => {
  if (hue < 0 || hue >= 360) {
    throw new Error(
      `Invalid Hue input: ${hue}. Hue must be greater than or equal to 0, and less than 360`
    )
  }

  if (saturation < 0 || saturation > 1) {
    throw new Error(
      `Invalid Saturation input: ${saturation}. Saturation must be greater than or equal to 0 and less than or equal to 1. Did you normalize it?`
    )
  }

  if (lightness < 0 || lightness > 1) {
    throw new Error(
      `Invalid Lightness input: ${lightness}. Lightness must be greater than or equal to 0 and less than or equal to 1. (Did you normalize it?)`
    )
  }

  // Source: https://www.rapidtables.com/convert/color/hsl-to-rgb.html

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - c / 2

  let red = m
  let green = m
  let blue = m

  if (hue < 60) {
    red += c
    green += x
  } else if (hue < 120) {
    red += x
    green += c
  } else if (hue < 180) {
    green += c
    blue += x
  } else if (hue < 240) {
    green += x
    blue += c
  } else if (hue < 300) {
    red += x
    blue += c
  } else if (hue < 360) {
    red += c
    blue += x
  }

  return { red, green, blue }
}
