import { Points } from '../points'

export interface Spline {
  solve: (x: number) => number
}

export type SplineFactory<Options = never> = (points: Points, options?: Options) => Spline
