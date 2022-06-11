import { RGB } from '@chromatika/types'
import { assertHSLInput } from '../assertions'

/**
 * Converts the HSL form of a color to the RGB form of the same color.
 *
 * Hue should be in degrees, being an integer greater than or equal to 0 and less than 360.
 * Saturation and Lightness should be greater than or equal to 0, less than or equal to 100.
 *
 * @param hue Hue component of the color to convert. Must be greater than or equal to 0, and less than 360.
 * @param saturation Saturation component of the color to convert. Must be greater than or equal to 0, less than or equal to 100.
 * @param lightness Lightness component of the color to convert. Must be greater than or equal to 0, less than or equal to 100.
 */
export const convertHSLToRGB = (hue: number, saturation: number, lightness: number): RGB => {
  assertHSLInput(hue, saturation, lightness)

  // Source: https://www.rapidtables.com/convert/color/hsl-to-rgb.html

  const c = (1 - Math.abs(2 * (lightness * 0.01) - 1)) * (saturation * 0.01)
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness * 0.01 - c / 2

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

  red = Math.round(red * 255)
  green = Math.round(green * 255)
  blue = Math.round(blue * 255)

  return { red, green, blue }
}
