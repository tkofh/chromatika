import { roundTo } from 'micro-math'
import { assertHSLInput } from '../assertions'

/**
 * getHSLString returns a string representation of a color as a CSS hsl color.
 *
 * Hue should be in degrees, being an integer greater than or equal to 0 and less than 360.
 * Saturation and Lightness should be greater than or equal to 0, less than or equal to 100.
 *
 * @param hue Hue channel of the color to stringify. Must be an integer greater than or equal to 0, and less than 360.
 * @param saturation Saturation channel of the color to stringify. Must be greater than or equal to 0, less than or equal to 100.
 * @param lightness Lightness channel of the color to stringify. Must be greater than or equal to 0, less than or equal to 100.
 * @param alpha Alpha channel of the color to stringify. If defined, must be greater than or equal to 0, less than or equal to 1.
 */
export const getHSLString = (hue: number, saturation: number, lightness: number, alpha?: number): string => {
  assertHSLInput(hue, saturation, lightness, alpha)

  return `hsl${alpha != null ? 'a' : ''}(${hue}deg, ${roundTo(saturation, 15)}%, ${roundTo(lightness, 15)}%${alpha != null ? `, ${alpha}` : ''})`
}
