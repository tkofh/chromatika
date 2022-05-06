export const assertHue = (hue: number, label = 'Hue') => {
  if (hue < 0 || hue >= 360) {
    throw new Error(
      `Invalid ${label} input: ${hue}. ${label} must be greater than or equal to 0, and less than 360`
    )
  }
}
