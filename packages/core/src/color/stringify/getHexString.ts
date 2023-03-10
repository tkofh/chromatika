import { assertRGBInput } from '../assertions'

/**
 * getHexString returns a string representation of a color as a CSS hex code.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red channel of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 * @param green Green channel of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 * @param blue Blue channel of the color to stringify. Must be an integer greater than or equal to 0, less than or equal to 255
 * @param alpha Alpha channel of the color to stringify. If defined, must be a float greater than or equal to 0, less than or equal to 1
 */
export const getHexString = (red: number, green: number, blue: number, alpha?: number): string => {
  assertRGBInput(red, green, blue, alpha)

  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')
  const alphaHex =
    alpha != null
      ? Math.round(alpha * 255)
          .toString(16)
          .padStart(2, '0')
      : ''

  return `#${redHex}${greenHex}${blueHex}${alphaHex}`
}
