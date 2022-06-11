import { assertRGBInput } from '../assertions'

/**
 * getRGBString returns a string representation of a color as a CSS rgb color.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 100.
 *
 * @param red Red component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param green Green component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param blue Blue component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255.
 */
export const getRGBString = (red: number, green: number, blue: number) => {
  assertRGBInput(red, green, blue)

  return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`
}
