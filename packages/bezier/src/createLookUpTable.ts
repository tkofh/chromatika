import { CubicPoints, Points } from '@chromatika/shared'
import { solveCubicBezier } from './solvieCubicBezier'

export const createLookUpTable = (points: CubicPoints, resolution: number) => {
  const lookUpTable: Points = []

  lookUpTable.push(points[0])

  for (let j = 0; j < resolution; j++) {
    const t = (j + 1) / (resolution + 1)

    lookUpTable.push(solveCubicBezier(t, points))
  }
  lookUpTable.push(points[3])

  return lookUpTable
}
