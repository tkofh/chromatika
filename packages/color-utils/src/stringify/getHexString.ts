import { assertRGBInput } from '../assertions'

/**
 * getHexString returns a string representation of a color as a CSS hex code.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 * @param green Green component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 * @param blue Blue component of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 */
export const getHexString = (red: number, green: number, blue: number): string => {
  assertRGBInput(red, green, blue)

  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')

  return `#${redHex}${greenHex}${blueHex}`
}
