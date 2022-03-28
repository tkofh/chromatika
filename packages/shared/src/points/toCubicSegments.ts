import { Points, CubicPoints } from './types'

/**
 * toCubicSegments - convert a list of points into four-point segments, as inputs for cubic parametric curves
 * @param points
 */
export const toCubicSegments = (points: Points): Error | Array<CubicPoints> => {
  if ((points.length - 1) % 3 !== 0 || points.length < 4) {
    return new Error('Invalid Length')
  }

  const segments: Array<CubicPoints> = []

  for (let i = 0; i < (points.length - 1) / 3; i++) {
    segments.push([points[i * 3], points[i * 3 + 1], points[i * 3 + 2], points[i * 3 + 3]])
  }

  return segments
}
