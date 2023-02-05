import type { HSL, HSLA, RGBA } from '../../types'
import { assertHSLInput, assertRange } from '../assertions'

interface ConvertHSLToRGB {
  (hsl: HSL | HSLA): RGBA

  (hue: number, saturation: number, lightness: number, alpha?: number | undefined): RGBA
}

/**
 * Converts the HSL form of a color to the RGB form of the same color.
 *
 * Hue should be in degrees, being an integer greater than or equal to 0 and less than 360.
 * Saturation and Lightness should be greater than or equal to 0, less than or equal to 100.
 */
export const convertHSLToRGB: ConvertHSLToRGB = (
  param0: HSL | HSLA | number,
  param1?: number,
  param2?: number,
  param3?: number
): RGBA => {
  let hue!: number, saturation!: number, lightness!: number, alpha!: number

  if (typeof param0 === 'object') {
    hue = param0.hue
    saturation = param0.saturation
    lightness = param0.lightness
    alpha = 'alpha' in param0 ? param0.alpha : 1
  } else {
    hue = param0
    saturation = param1!
    lightness = param2!
    alpha = param3 ?? 1
  }

  assertHSLInput(hue, saturation, lightness)
  assertRange(alpha, 'alpha', 0, 1)

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

  return { red, green, blue, alpha }
}
