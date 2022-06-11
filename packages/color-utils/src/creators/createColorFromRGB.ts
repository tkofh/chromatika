import { Color } from '@chromatika/types'
import { convertRGBToHSL } from '../convert'
import { getRelativeLuminance } from '../inspect'
import { getHexString, getHSLString, getRGBString } from '../stringify'

/**
 * Create a Color object from the Red, Green, and Blue components of a Color.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red component of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param green Green component of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param blue Blue component of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 */
export const createColorFromRGB = (red: number, green: number, blue: number): Color => {
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
  }
}
