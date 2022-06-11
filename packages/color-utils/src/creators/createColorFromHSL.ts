import { Color } from '@chromatika/types'
import { assertHSLInput } from '../assertions'
import { convertHSLToRGB } from '../convert'
import { getRelativeLuminance } from '../inspect'
import { getHexString, getHSLString, getRGBString } from '../stringify'

/**
 * Create a Color object from the Hue, Saturation, and Lightness components of a color.
 *
 * Hue should be in degrees, being an integer greater than or equal to 0 and less than 360.
 * Saturation and Lightness should be greater than or equal to 0, less than or equal to 100.
 *
 * @param hue Hue component of the color to convert. Must be greater than or equal to 0, and less than 360.
 * @param saturation Saturation component of the color to convert. Must be greater than or equal to 0, less than or equal to 100.
 * @param lightness Lightness component of the color to convert. Must be greater than or equal to 0, less than or equal to 100.
 */
export const createColorFromHSL = (hue: number, saturation: number, lightness: number): Color => {
  assertHSLInput(hue, saturation, lightness)

  const { red, green, blue } = convertHSLToRGB(hue, saturation, lightness)
  const relativeLuminance = getRelativeLuminance(red, green, blue)
  const hsl = getHSLString(hue, saturation, lightness)
  const rgb = getRGBString(red, green, blue)
  const hex = getHexString(red, green, blue)

  return {
    hue,
    saturation,
    lightness,
    red,
    green,
    blue,
    rgb,
    hsl,
    hex,
    relativeLuminance,
  }
}
