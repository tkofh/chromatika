import { CubicPoints, Points, Rect } from '@chromatika/shared'
import { solveCubicBezier } from './solvieCubicBezier'

export interface LookUpTable {
  bounds: Rect
  points: Points
}

export const createLookUpTable = (input: CubicPoints, resolution: number): LookUpTable => {
  const points: Points = []

  const bounds: Rect = {
    top: Math.max(input[0][1], input[3][1]),
    right: input[3][0],
    bottom: Math.min(input[0][1], input[3][1]),
    left: input[0][0],
  }

  points.push(input[0])
  for (let j = 0; j < resolution; j++) {
    const t = (j + 1) / (resolution + 1)

    const point = solveCubicBezier(t, input)

    points.push(point)

    if (point[1] < bounds.bottom) {
      bounds.bottom = point[1]
    }
    if (point[1] > bounds.top) {
      bounds.top = point[1]
    }
  }
  points.push(input[3])

  return { points, bounds }
}
