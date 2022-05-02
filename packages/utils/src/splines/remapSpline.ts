import { Points, Rect, Spline } from '@chromatika/types'
import { remap, roundTo } from '../math'

export const remapSpline = (spline: Spline, target: Rect): Spline => {
  const extrema: Points = []
  for (const extreme of spline.extrema) {
    extrema.push([
      roundTo(
        remap(
          extreme[0],
          spline.boundingBox.minX,
          spline.boundingBox.maxX,
          target.minX,
          target.maxX
        ),
        spline.precision
      ),
      roundTo(
        remap(
          extreme[1],
          spline.boundingBox.minY,
          spline.boundingBox.maxY,
          target.minY,
          target.maxY
        ),
        spline.precision
      ),
    ])
  }

  const solve: Spline['solve'] = (x) => {
    const baseSolution = spline.solve(
      remap(x, target.minX, target.maxX, spline.boundingBox.minX, spline.boundingBox.maxX)
    )
    return baseSolution === undefined
      ? baseSolution
      : roundTo(
          remap(
            baseSolution,
            spline.boundingBox.minY,
            spline.boundingBox.maxY,
            target.minY,
            target.maxY
          ),
          spline.precision
        )
  }

  const solveInverse: Spline['solveInverse'] = (y, minX, maxX) => {
    const remappedMinX =
      minX === undefined
        ? minX
        : remap(minX, target.minX, target.maxX, spline.boundingBox.minX, spline.boundingBox.maxX)

    const remappedMaxX =
      maxX === undefined
        ? maxX
        : remap(maxX, target.minX, target.maxX, spline.boundingBox.minX, spline.boundingBox.maxX)

    const remappedY = remap(
      y,
      target.minY,
      target.maxY,
      spline.boundingBox.minY,
      spline.boundingBox.maxY
    )

    const baseSolution = spline.solveInverse(remappedY, remappedMinX, remappedMaxX)

    return baseSolution === undefined
      ? baseSolution
      : roundTo(
          remap(
            baseSolution,
            spline.boundingBox.minX,
            spline.boundingBox.maxX,
            target.minX,
            target.maxX
          ),
          spline.precision
        )
  }

  return {
    solve,
    solveInverse,
    extrema,
    boundingBox: target,
    precision: spline.precision,
  }
}
