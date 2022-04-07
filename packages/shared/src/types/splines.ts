import { Points } from './points'
import { Rect } from './shapes'

export interface Spline {
  solve: (x: number) => number
  boundingBox: Rect
  extrema: Points
  precision: number
}

export type SplineFactory<Options = never> = (points: Points, options?: Options) => Spline
