import { Points, Rect, Spline } from '@chromatika/shared'
import { remap, roundTo } from '../math'

export const remapSpline = (spline: Spline, target: Rect): Spline => {
  const extrema: Points = []
  for (const extreme of spline.extrema) {
    extrema.push([
      roundTo(
        remap(
          extreme[0],
          spline.boundingBox.left,
          spline.boundingBox.right,
          target.left,
          target.right
        ),
        spline.precision
      ),
      roundTo(
        remap(
          extreme[1],
          spline.boundingBox.top,
          spline.boundingBox.bottom,
          target.top,
          target.bottom
        ),
        spline.precision
      ),
    ])
  }

  const solve = (x: number) =>
    roundTo(
      remap(
        spline.solve(x),
        spline.boundingBox.top,
        spline.boundingBox.bottom,
        target.top,
        target.bottom
      ),
      spline.precision
    )

  return {
    solve,
    extrema,
    boundingBox: target,
    precision: spline.precision,
  }
}
