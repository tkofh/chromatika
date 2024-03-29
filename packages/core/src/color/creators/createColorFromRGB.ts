import type { Color } from '../../types'
import { convertRGBToHSL } from '../convert'
import { getRelativeLuminance } from '../inspect'
import { getHexString, getHSLString, getRGBString } from '../stringify'
import { parseRGBString } from '../parse'

/**
 * Create a Color object from the Red, Green, and Blue components of a Color.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red channel of the color to create. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param green Green channel of the color to create. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param blue Blue channel of the color to create. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param alpha Alpha channel of the color to create. Must be a float greater than or equal to 0, less than or equal to 1.
 */
export const createColorFromRGB = (red: number, green: number, blue: number, alpha = 1): Color => {
  const { hue, saturation, lightness } = convertRGBToHSL(red, green, blue)
  const relativeLuminance = getRelativeLuminance(red, green, blue)
  const hsl = getHSLString(hue, saturation, lightness)
  const rgb = getRGBString(red, green, blue)
  const hex = getHexString(red, green, blue)

  return {
    red,
    green,
    blue,
    hue,
    saturation,
    lightness,
    rgb,
    hex,
    hsl,
    relativeLuminance,
    alpha,
  }
}

export const createColorFromRGBString = (rgb: string) => {
  const parsed = parseRGBString(rgb)
  return createColorFromRGB(parsed.red, parsed.green, parsed.blue, parsed.alpha)
}
