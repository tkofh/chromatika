import { assertRGBInput } from '../assertions'

/**
 * Return the relative luminance of a color.
 *
 * This value serves as the basis for contrast ratio calculations.
 *
 * Red, Green, and Blue should be integers greater than or equal to 0, less than or equal to 255.
 *
 * @param red Red component of the color. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param green Green component of the color. Must be an integer greater than or equal to 0, less than or equal to 255.
 * @param blue Blue component of the color. Must be an integer greater than or equal to 0, less than or equal to 255.
 */
export const getRelativeLuminance = (red: number, green: number, blue: number): number => {
  assertRGBInput(red, green, blue)

  const redNormalized = red / 255
  const greenNormalized = green / 255
  const blueNormalized = blue / 255

  // Source: https://www.w3.org/TR/WCAG20/#relativeluminancedef

  const redLinear =
    redNormalized <= 0.03928
      ? redNormalized / 12.92
      : Math.pow((redNormalized + 0.055) / 1.055, 2.4)
  const greenLinear =
    greenNormalized <= 0.03928
      ? greenNormalized / 12.92
      : Math.pow((greenNormalized + 0.055) / 1.055, 2.4)
  const blueLinear =
    blueNormalized <= 0.03928
      ? blueNormalized / 12.92
      : Math.pow((blueNormalized + 0.055) / 1.055, 2.4)

  return 0.2126 * redLinear + 0.7152 * greenLinear + 0.0722 * blueLinear
}
