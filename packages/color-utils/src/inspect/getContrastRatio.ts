/**
 * Returns the contrast ratio between 1 and 21 between two colors' luminance dimensions.
 *
 * @param luminanceA
 * @param luminanceB
 */
export const getContrastRatio = (luminanceA: number, luminanceB: number): number => {
  const luminanceMin = Math.min(luminanceA, luminanceB)
  const luminanceMax = Math.max(luminanceA, luminanceB)

  return (luminanceMax + 0.05) / (luminanceMin + 0.05)
}
