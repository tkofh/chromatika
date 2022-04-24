import { Points } from './points'
import { Rect } from './shapes'

export interface Spline {
  solve: (x: number) => number | undefined
  solveInverse: (y: number, minX?: number, maxX?: number) => number | undefined
  boundingBox: Rect
  extrema: Points
  precision: number
}
