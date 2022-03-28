/**
 * Get the roots of a quadratic polynomial, via the standard and Muller's variation of the quadratic formula
 * @param a
 * @param b
 * @param c
 */
export const getQuadraticRoots = (a: number, b: number, c: number): number[] => {
  const out: number[] = []

  // if both a and c are 0, then neither the standard nor Muller's form of the formula will work
  if (a !== 0 || c !== 0) {
    // in both forms, we need to ensure we don't take the square root of a negative number
    const root = b ** 2 - 4 * a * c
    if (root >= 0) {
      const sqrt = Math.sqrt(root)

      // if a is not 0, we can use the standard form
      if (a !== 0) {
        out.push((-b + sqrt) / (2 * a))
        out.push((-b - sqrt) / (2 * a))
      } else {
        // otherwise, we can use Muller's form
        if (b + sqrt !== 0) {
          out.push((-2 * c) / (b + sqrt))
        }
        if (b - sqrt !== 0) {
          out.push((-2 * c) / (b - sqrt))
        }
      }
    }
  }

  return out
}
