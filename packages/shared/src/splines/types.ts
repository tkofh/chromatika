import { Points } from '../points'

export interface Spline {
  solve: (x: number) => number
}

export type SplineFactory = (points: Points) => Spline
