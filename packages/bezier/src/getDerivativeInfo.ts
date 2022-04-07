import { quadraticRoots } from '@chromatika/utils'

interface DerivativeInfo {
  y0: number
  roots: number[]
}

export const getDerivativeInfo = (
  x0: number,
  x1: number,
  x2: number,
  x3: number
): DerivativeInfo => {
  const a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3
  const b = 6 * x0 - 12 * x1 + 6 * x2
  const c = -3 * x0 + 3 * x1

  const roots: number[] = []
  for (const root of quadraticRoots(a, b, c)) {
    if (root !== undefined && root > 0 && root < 1) {
      roots.push(root)
    }
  }
  roots.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

  return {
    y0: c,
    roots,
  }
}