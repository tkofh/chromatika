import type { HSLA } from '@chromatika/types'
import { assertRGBInput } from '../assertions'

/**
 * Converts the RGB form of a color to the HSL form of the same color.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red channel of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param green Green channel of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param blue Blue channel of the color to convert. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param alpha Alpha channel of the color to convert. If defined, must be greater than or equal to 0, less than or equal to 1.
 */
export const convertRGBToHSL = (red: number, green: number, blue: number, alpha = 1): HSLA => {
  assertRGBInput(red, green, blue)

  // Source: https://www.rapidtables.com/convert/color/rgb-to-hsl.html

  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const cMin = Math.min(r, g, b)
  const cMax = Math.max(r, g, b)

  const cDelta = cMax - cMin
  const cMean = (cMin + cMax) * 0.5

  let hue!: number
  if (cDelta === 0) {
    hue = 0
  } else if (cMax === r) {
    hue = (((g - b) / cDelta) % 6) * 60
  } else if (cMax === g) {
    hue = ((b - r) / cDelta + 2) * 60
  } else {
    hue = ((r - g) / cDelta + 4) * 60
  }

  const lightness = Math.round(cMean * 100)

  const saturation = (cDelta === 0 ? 0 : cDelta / (1 - Math.abs(2 * cMean - 1))) * 100

  return {
    hue,
    saturation,
    lightness,
    alpha,
  }
}
