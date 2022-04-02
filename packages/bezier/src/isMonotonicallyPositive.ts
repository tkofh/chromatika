import { quadraticRoots } from '@chromatika/utils'

/**
 * isMonotonicallyPositive ensures a cubic bezier-curve passes the vertical line test
 *
 * it ensures the curve does not start and end in the same place, that the first derivative of the curve starts positive,
 * and that there are no local extrema along the first derivative (indicating that the curve doubles back)
 *
 * @param x0
 * @param x1
 * @param x2
 * @param x3
 */
export const isMonotonicallyPositive = (
  x0: number,
  x1: number,
  x2: number,
  x3: number
): boolean => {
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
  const [rootA, rootB] = quadraticRoots(a, b, c)

  // if there are no roots, or there is only one root (which indicates the sign changes for one point only),
  // we don't need to consider the extrema
  if (rootA !== rootB) {
    // otherwise, check each one for fitting inside the (0, 1) range
    if (rootA !== undefined && rootA > 0 && rootA < 1) {
      return false
    }

    if (rootB !== undefined && rootB > 0 && rootB < 1) {
      return false
    }
  }

  return true
}
