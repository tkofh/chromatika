import { roundTo } from '@chromatika/math'
import { assertHue, assertNormalized } from '../util'

/**
 * getHSLString returns a string representation of a color as a CSS hsl color
 *
 * @param hue Hue component of the color to stringify. Must be greater than or equal to 0, and less than 360
 * @param saturation Saturation component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param lightness Lightness component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 */
export const getHSLString = (hue: number, saturation: number, lightness: number): string => {
  assertHue(hue)
  assertNormalized(saturation, 'Saturation')
  assertNormalized(lightness, 'Lightness')

  return `hsl(${hue}deg, ${roundTo(saturation * 100, 15)}%, ${roundTo(lightness * 100, 15)}%)`
}
