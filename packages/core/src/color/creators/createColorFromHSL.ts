import type { Color } from '../../types'
import { assertHSLInput } from '../assertions'
import { convertHSLToRGB } from '../convert'
import { getRelativeLuminance } from '../inspect'
import { getHexString, getHSLString, getRGBString } from '../stringify'
import { parseHSLString } from '../parse'

/**
 * Create a Color object from the Hue, Saturation, and Lightness components of a color.
 *
 * Hue should be in degrees, being an integer greater than or equal to 0 and less than 360.
 * Saturation and Lightness should be greater than or equal to 0, less than or equal to 100.
 *
 * @param hue Hue channel of the color to create. Must be greater than or equal to 0, and less than 360.
 * @param saturation Saturation channel of the color to create. Must be greater than or equal to 0, less than or equal to 100.
 * @param lightness Lightness channel of the color to create. Must be greater than or equal to 0, less than or equal to 100.
 * @param alpha Alpha channel of the color to create. Must be greater than or equal to 0, less than or equal to 1.
 */
export const createColorFromHSL = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 1
): Color => {
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
    alpha,
  }
}

export const createColorFromHSLString = (hsl: string) => {
  const parsed = parseHSLString(hsl)
  return createColorFromHSL(parsed.hue, parsed.saturation, parsed.lightness, parsed.alpha)
}
