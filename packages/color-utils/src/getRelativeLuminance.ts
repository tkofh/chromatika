/**
 * Return the relative luminance of a color
 *
 * This value serves as the basis for contrast ratio calculations
 *
 * @param red Red component of the color. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param green Green component of the color. Must be normalized (greater than or equal to 0, less than or equal to 1)
 * @param blue Blue component of the color. Must be normalized (greater than or equal to 0, less than or equal to 1)
 */
export const getRelativeLuminance = (red: number, green: number, blue: number): number => {
  if (red < 0 || red > 1) {
    throw new Error(
      `Invalid Red input: ${red}. Red must be greater than or equal to 0 and less than or equal to 1. Did you normalize it?`
    )
  }

  if (green < 0 || green > 1) {
    throw new Error(
      `Invalid Green input: ${green}. Green must be greater than or equal to 0 and less than or equal to 1. Did you normalize it?`
    )
  }

  if (blue < 0 || blue > 1) {
    throw new Error(
      `Invalid Blue input: ${blue}. Blue must be greater than or equal to 0 and less than or equal to 1. Did you normalize it?`
    )
  }

  // Source: https://www.w3.org/TR/WCAG20/#relativeluminancedef

  const redLinear = red <= 0.03928 ? red / 12.92 : Math.pow((red + 0.055) / 1.055, 2.4)
  const greenLinear = green <= 0.03928 ? green / 12.92 : Math.pow((green + 0.055) / 1.055, 2.4)
  const blueLinear = blue <= 0.03928 ? blue / 12.92 : Math.pow((blue + 0.055) / 1.055, 2.4)

  return 0.2126 * redLinear + 0.7152 * greenLinear + 0.0722 * blueLinear
}
