import {
  CubicPoints,
  Points,
  QuadraticPoints,
  CubicPointComponents,
  QuadraticPointComponents,
  PointComponents,
} from './types'

export const unzipQuadraticPoints = (
  points: QuadraticPoints
): [QuadraticPointComponents, QuadraticPointComponents] => [
  [points[0][0], points[1][0], points[2][0]],
  [points[0][1], points[1][1], points[2][1]],
]

export const unzipCubicPoints = (
  points: CubicPoints
): [CubicPointComponents, CubicPointComponents] => [
  [points[0][0], points[1][0], points[2][0], points[3][0]],
  [points[0][1], points[1][1], points[2][1], points[3][1]],
]

export const unzipPoints = (points: Points): [PointComponents, PointComponents] => {
  const x: PointComponents = []
  const y: PointComponents = []

  for (const point of points) {
    x.push(point[0])
    y.push(point[1])
  }

  return [x, y]
}
