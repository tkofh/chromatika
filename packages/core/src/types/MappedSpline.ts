import { Spline } from '@chromatika/shared'

export type MappedSpline =
  | Spline
  | {
      spline: Spline
      min: number
      max: number
    }
