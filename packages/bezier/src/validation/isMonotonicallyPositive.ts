import { getQuadraticRoots, CubicPointComponents } from '@chromatika/shared'

export const isMonotonicallyPositive = (points: CubicPointComponents): boolean => {
  const [x0, x1, x2, x3] = points

  // Ensure the curve's start and end points are not at the same position
  if (x0 === x3) {
    return false
  }

  // Get the c value for the polynomial describing the x-axis of the curve's first derivative
  const c = -3 * x0 + 3 * x1

  // Check whether the curve starts out negative
  // Since t = 0, we only need to consider the constant of the polynomial, c
  if (c < 0) {
    return false
  }

  // Get the a and b values for the polynomial describing the x-axis of the first derivative
  const a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3
  const b = 6 * x0 - 12 * x1 + 6 * x2

  // Check for local extrema within the normalized 0 to 1 range
  // An extrema indicates that the x velocity changes sign,
  // and since we know the curve starts out positive, a change indicates that the curve goes negative
  const extrema = getQuadraticRoots(a, b, c)

  for (const extreme of extrema) {
    // Some extrema can exist outside the 0 to 1 range, but they don't matter here
    if (extreme >= 0 && extreme <= 1) {
      return false
    }
  }

  return true
}
