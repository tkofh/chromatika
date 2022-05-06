import { assertNormalized } from '../util'

/**
 * getHexString returns a string representation of a color as a CSS hex code
 *
 * @param red Red component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param green Green component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param blue Blue component of the color to stringify. Must be normalized (greater than or equal to 0, less than or equal to 1)
 */
export const getHexString = (red: number, green: number, blue: number): string => {
  assertNormalized(red, 'Red')
  assertNormalized(green, 'Green')
  assertNormalized(blue, 'Blue')

  const redHex = Math.round(red * 255)
    .toString(16)
    .padStart(2, '0')
  const greenHex = Math.round(green * 255)
    .toString(16)
    .padStart(2, '0')
  const blueHex = Math.round(blue * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${redHex}${greenHex}${blueHex}`
}
