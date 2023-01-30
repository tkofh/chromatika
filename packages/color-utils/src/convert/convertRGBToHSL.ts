import type { HSLA, RGB, RGBA } from '@chromatika/types'
import { assertRange, assertRGBInput } from '../assertions'

interface ConvertRGBToHSL {
  (rgb: RGB | RGBA): HSLA

  (red: number, green: number, blue: number, alpha?: number): HSLA
}

/**
 * Converts the RGB form of a color to the HSL form of the same color.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 */
export const convertRGBToHSL: ConvertRGBToHSL = (
  param0: RGBA | RGB | number,
  param1?: number,
  param2?: number,
  param3?: number
): HSLA => {
  let red!: number, green!: number, blue!: number, alpha!: number

  if (typeof param0 === 'object') {
    red = param0.red
    green = param0.green
    blue = param0.blue
    alpha = 'alpha' in param0 ? param0.alpha : 1
  } else {
    red = param0
    green = param1!
    blue = param2!
    alpha = param3 ?? 1
  }

  assertRGBInput(red, green, blue)
  assertRange(alpha, 'alpha', 0, 1)

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
