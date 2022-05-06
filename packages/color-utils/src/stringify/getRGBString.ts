import { assertNormalized } from '../util'

/**
 * getRGBString returns a string representation of a color as a CSS rgb color
 *
 * @param red Red component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param green Green component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param blue Blue component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 */
export const getRGBString = (red: number, green: number, blue: number) => {
  assertNormalized(red, 'Red')
  assertNormalized(green, 'Green')
  assertNormalized(blue, 'Blue')

  return `rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)})`
}
