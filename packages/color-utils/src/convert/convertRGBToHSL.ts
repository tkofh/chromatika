import { HSL } from '@chromatika/types'
import { assertNormalized } from '../util'
/**
 * Converts the RGB form of a color to the HSL form of the same color.
 *
 * Red, Green, and Blue should be normalized, being greater than or equal to 0 and less than or equal to 1
 *
 * @param red Red component of the color to convert. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param green Green component of the color to convert. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param blue Blue component of the color to convert. Must be normalized (greater than or equal to 0, less than or equal to 1)
 */
export const convertRGBToHSL = (red: number, green: number, blue: number): HSL => {
  assertNormalized(red, 'Red')
  assertNormalized(green, 'Green')
  assertNormalized(blue, 'Blue')

  // Source: https://www.rapidtables.com/convert/color/rgb-to-hsl.html

  const cMin = Math.min(red, green, blue)
  const cMax = Math.max(red, green, blue)

  const delta = cMax - cMin

  let hue!: number
  if (delta === 0) {
    hue = 0
  } else if (cMax === red) {
    hue = (((green - blue) / delta) % 6) * 60
  } else if (cMax === green) {
    hue = ((blue - red) / delta + 2) * 60
  } else {
    hue = ((red - green) / delta + 4) * 60
  }

  const lightness = (cMax + cMin) / 2

  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  return {
    hue,
    saturation,
    lightness,
  }
}
