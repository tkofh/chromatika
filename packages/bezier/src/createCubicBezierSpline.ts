import { CubicPoints, Points, Rect, Spline } from '@chromatika/types'
import { remap, roundTo } from '@chromatika/math'
import { warnDev } from '@chromatika/dx'
import { getDerivativeInfo } from './getDerivativeInfo'
import { DEFAULT_LUT_RESOLUTION, DEFAULT_PRECISION } from './constants'
import { createCubicBezierSolver } from './createCubicBezierSolver'

interface CreateCubicBezierSplineOptions {
  /**
   * Number of samples to take of the curve.
   * A larger number yields more accurate results, but takes longer to compute.
   *
   * Default: 512
   */
  lutResolution?: number
  /**
   * The number of decimal places to which the output (curve Y value) should be calculated.
   *
   * Default: 16
   */
  precision?: number
  /**
   * The number of decimal places to consider for an input (curve X value).
   *
   * Default: 16
   */
  inputPrecision?: number
}

export const createCubicBezierSpline = (
  points: CubicPoints,
  options?: CreateCubicBezierSplineOptions
): Spline => {
  const outputPrecision = options?.precision ?? DEFAULT_PRECISION
  const inputPrecision = options?.inputPrecision ?? outputPrecision

  const lutResolution = options?.lutResolution ?? DEFAULT_LUT_RESOLUTION

  /**
   * It's safe to round the input points because they shouldn't
   * be more precise than the desired input and output values
   *
   * They need to be rounded to determine the extrema of the
   * curve after precision is taken into account, as these
   * values may differ from the extrema of an input curve
   * with extra precision
   */

  const p0x = roundTo(points[0][0], inputPrecision)
  const p1x = roundTo(points[1][0], inputPrecision)
  const p2x = roundTo(points[2][0], inputPrecision)
  const p3x = roundTo(points[3][0], inputPrecision)

  /**
   * Before doing anything else, get the x derivative info and
   * ensure the curve is monotonically positive
   */
  const dx = getDerivativeInfo(p0x, p1x, p2x, p3x)
  if (dx.y0 < 0 || dx.roots.length > 0) {
    throw new Error(
      `Curve ${points
        .map((point) => `[${point[0]}, ${point[1]}]`)
        .join(', ')} is not monotonically positive`
    )
  }

  const p0y = roundTo(points[0][1], outputPrecision)
  const p1y = roundTo(points[1][1], outputPrecision)
  const p2y = roundTo(points[2][1], outputPrecision)
  const p3y = roundTo(points[3][1], outputPrecision)

  const solveX = createCubicBezierSolver(p0x, p1x, p2x, p3x)
  const solveY = createCubicBezierSolver(p0y, p1y, p2y, p3y)

  const resultCache = new Map<number, number>()

  const lutX: number[] = []
  const lutY: number[] = []

  resultCache.set(p0x, p0y)

  lutX.push(p0x)
  lutY.push(p0y)

  // start at s=1 and end where s=(resolution - 1) because the endpoints are already known from the input
  for (let s = 1; s < lutResolution - 1; s++) {
    const t = s / (lutResolution - 1)

    const sx = solveX(t)
    const sy = solveY(t)

    lutX.push(sx)
    lutY.push(sy)
  }

  resultCache.set(p3x, p3y)

  lutX.push(p3x)
  lutY.push(p3y)

  const extrema: Points = []

  const boundingBox: Rect = {
    maxY: Math.max(p0y, p3y),
    minX: p0x,
    minY: Math.min(p0y, p3y),
    maxX: p3x,
  }

  extrema.push([p0x, p0y])

  /**
   * On the Y axis, there could be zero, one, or two roots.
   * getDerivativeInfo() filters out identical roots, i.e. when
   * the sign changes for a singular point.
   *
   * If there are one or two roots, compare the Y values on the curve
   * with its neighbors, to see if it exceeds that local bounding box.
   * If it does, the root is at an extrema. This should usually be
   * the case.
   *
   * Regardless of a root being an extrema, also add it to the lookup table
   * (unless its already in the table somehow)
   */

  const dy = getDerivativeInfo(p0y, p1y, p2y, p3y)
  if (dy.roots.length === 1) {
    const rx = roundTo(solveX(dy.roots[0]), inputPrecision)
    const ry = roundTo(solveY(dy.roots[0]), outputPrecision)

    if (ry < Math.min(p0y, p3y) || ry > Math.max(p0y, p3y)) {
      extrema.push([rx, ry])

      if (ry < boundingBox.minY) {
        boundingBox.minY = ry
      }
      if (ry > boundingBox.maxY) {
        boundingBox.maxY = ry
      }
    }

    resultCache.set(rx, ry)

    for (let i = 0; i < lutResolution - 1; i++) {
      if (rx === lutX[i]) {
        break
      }

      if (rx > lutX[i] && rx < lutX[i + 1]) {
        lutX.splice(i, 0, rx)
        lutY.splice(i, 0, ry)
        break
      }
    }
  } else if (dy.roots.length === 2) {
    const r1x = roundTo(solveX(dy.roots[0]), inputPrecision)
    const r1y = roundTo(solveY(dy.roots[0]), outputPrecision)

    const r2x = roundTo(solveX(dy.roots[1]), inputPrecision)
    const r2y = roundTo(solveY(dy.roots[1]), outputPrecision)

    if (r1y < Math.min(p0y, r2y) || r1y > Math.max(p0y, r2y)) {
      extrema.push([r1x, r1y])

      if (r1y < boundingBox.minY) {
        boundingBox.minY = r1y
      }
      if (r1y > boundingBox.maxY) {
        boundingBox.maxY = r1y
      }
    }

    if (r2y < Math.min(r1y, p3y) || r2y > Math.max(r1y, p3y)) {
      extrema.push([r2x, r2y])

      if (r2y < boundingBox.minY) {
        boundingBox.minY = r2y
      }
      if (r2y > boundingBox.maxY) {
        boundingBox.maxY = r2y
      }
    }

    resultCache.set(r1x, r1y)
    resultCache.set(r2x, r2y)

    let r1i
    for (r1i = 0; r1i < lutX.length; r1i++) {
      if (r1x === lutX[r1i]) {
        break
      }
      if (r1x > lutX[r1i] && r1x < lutX[r1i + 1]) {
        lutX.splice(r1i, 0, r1x)
        lutY.splice(r1i, 0, r1y)
        break
      }
    }

    for (let r2i = r1i; r2i < lutX.length; r2i++) {
      if (r2x === lutX[r2i]) {
        break
      }
      if (r2x > lutX[r2i] && r2x < lutX[r2i + 1]) {
        lutX.splice(r2i, 0, r2x)
        lutY.splice(r2i, 0, r2y)
        break
      }
    }
  }

  extrema.push([p3x, p3y])

  const lutSize = lutX.length

  const solve = (x: number): number | undefined => {
    const input = roundTo(x, inputPrecision)

    let output: number | undefined

    if (resultCache.has(input)) {
      output = resultCache.get(input)!
    } else if (input < boundingBox.minX) {
      warnDev(`Cannot solve curve at ${x} because curve is undefined below ${boundingBox.minX}`)
    } else if (input > boundingBox.maxX) {
      warnDev(`Cannot solve curve at ${x} because curve is undefined above ${boundingBox.maxX}`)
    } else {
      for (let i = 0; i < lutSize - 1; i++) {
        if (input >= lutX[i] && input <= lutX[i + 1]) {
          output = roundTo(
            remap(input, lutX[i], lutX[i + 1], lutY[i], lutY[i + 1]),
            outputPrecision
          )
          break
        }
      }
    }

    if (output !== undefined) {
      resultCache.set(input, output)
    }

    return output
  }

  const solveInverse = (
    y: number,
    minX = boundingBox.minX,
    maxX = boundingBox.maxX
  ): number | undefined => {
    const input = roundTo(y, outputPrecision)

    let output: number | undefined

    if (input < boundingBox.minY) {
      warnDev(
        `Cannot inverse solve curve at ${y} because curve is undefined below ${boundingBox.minY}`
      )
    } else if (input > boundingBox.maxY) {
      warnDev(
        `Cannot inverse solve curve at ${y} because curve is undefined above ${boundingBox.maxY}`
      )
    } else {
      for (let i = 0; i < lutY.length - 1; i++) {
        const lutYMin = Math.min(lutY[i], lutY[i + 1])
        const lutYMax = Math.max(lutY[i], lutY[i + 1])
        if (lutX[i] <= maxX && lutX[i + 1] >= minX && lutYMin <= input && lutYMax >= input) {
          const x = roundTo(
            remap(input, lutY[i], lutY[i + 1], lutX[i], lutX[i + 1]),
            inputPrecision
          )
          if (x >= minX && x <= maxX) {
            output = x
            break
          }
        }
      }
    }

    if (output !== undefined) {
      resultCache.set(output, input)
    }

    return output
  }

  return {
    solve,
    solveInverse,
    precision: outputPrecision,
    extrema,
    boundingBox,
  }
}
