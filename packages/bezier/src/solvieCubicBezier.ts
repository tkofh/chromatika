import { CubicPoints, Point } from '@chromatika/shared'

export const solveCubicBezier = (t: number, points: CubicPoints): Point => [
  points[0][0] * (-(t * t * t) + 3 * t * t - 3 * t + 1) +
    points[1][0] * (3 * t * t * t - 6 * t * t + 3 * t) +
    points[2][0] * (-3 * t * t * t + 3 * t * t) +
    points[3][0] * t * t * t,
  points[0][1] * (-(t * t * t) + 3 * t * t - 3 * t + 1) +
    points[1][1] * (3 * t * t * t - 6 * t * t + 3 * t) +
    points[2][1] * (-3 * t * t * t + 3 * t * t) +
    points[3][1] * t * t * t,
]
