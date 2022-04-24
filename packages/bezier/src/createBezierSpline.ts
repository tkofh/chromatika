import { Points, Rect, Spline, warnDev } from '@chromatika/shared'
import { roundTo } from '@chromatika/utils'
import { DEFAULT_LUT_RESOLUTION, DEFAULT_PRECISION } from './constants'
import { createCubicBezierSpline } from './createCubicBezierSpline'

interface CreateBezierSplineOptions {
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

export const createBezierSpline = (points: Points, options?: CreateBezierSplineOptions): Spline => {
  if (points.length < 4) {
    throw new Error('At least one cubic segment must be provided')
  }

  if ((points.length - 1) % 3 !== 0) {
    throw new Error('Invalid number of points provided (must have 3n+1 points)')
  }

  const outputPrecision = options?.precision ?? DEFAULT_PRECISION
  const inputPrecision = options?.inputPrecision ?? outputPrecision

  const lutResolution = options?.lutResolution ?? DEFAULT_LUT_RESOLUTION

  // number of points that sit along the curve
  const fixedPointCount = (points.length - 1) / 3

  const children: Spline[] = []
  const extremaCandidates: Points = []
  const boundingBox: Rect = { top: -Infinity, bottom: Infinity, left: Infinity, right: -Infinity }

  for (let i = 0; i < fixedPointCount; i++) {
    const child = createCubicBezierSpline(
      [points[i * 3], points[i * 3 + 1], points[i * 3 + 2], points[i * 3 + 3]],
      {
        lutResolution,
        precision: outputPrecision,
        inputPrecision,
      }
    )
    children.push(child)

    if (i === 0) {
      extremaCandidates.push(...child.extrema)
    } else {
      extremaCandidates.push(...child.extrema.slice(1))
    }

    if (child.boundingBox.top > boundingBox.top) {
      boundingBox.top = child.boundingBox.top
    }
    if (child.boundingBox.right > boundingBox.right) {
      boundingBox.right = child.boundingBox.right
    }
    if (child.boundingBox.bottom < boundingBox.bottom) {
      boundingBox.bottom = child.boundingBox.bottom
    }
    if (child.boundingBox.left < boundingBox.left) {
      boundingBox.left = child.boundingBox.left
    }
  }

  const extrema: Points = []
  for (let i = 0; i < extremaCandidates.length; i++) {
    const current = extremaCandidates[i]
    if (i === 0 || i === extremaCandidates.length - 1) {
      extrema.push(current)
    } else {
      const previous = extrema[extrema.length - 1]
      const next = extremaCandidates[i + 1]

      const minNeighbor = Math.min(previous[1], next[1])
      const maxNeighbor = Math.max(previous[1], next[1])

      if (current[1] < minNeighbor || current[1] > maxNeighbor) {
        extrema.push(current)
      }
    }
  }

  const solve = (x: number): number | undefined => {
    const input = roundTo(x, inputPrecision)

    let output: number | undefined

    if (input < boundingBox.left) {
      warnDev(`Cannot solve curve at ${x} because curve is undefined below ${boundingBox.left}`)
    } else if (input > boundingBox.right) {
      warnDev(`Cannot solve curve at ${x} because curve is undefined above ${boundingBox.right}`)
    } else {
      for (const child of children) {
        if (input >= child.boundingBox.left && input <= child.boundingBox.right) {
          output = child.solve(input)
          if (output !== undefined) {
            break
          }
        }
      }
    }

    return output
  }

  const solveInverse = (
    y: number,
    minX = boundingBox.left,
    maxX = boundingBox.right
  ): number | undefined => {
    const input = roundTo(y, outputPrecision)

    let output: number | undefined

    if (input < boundingBox.bottom) {
      warnDev(
        `Cannot inverse solve curve at ${y} because curve is undefined below ${boundingBox.bottom}`
      )
    } else if (input > boundingBox.top) {
      warnDev(
        `Cannot inverse solve curve at ${y} because curve is undefined above ${boundingBox.top}`
      )
    } else {
      for (const child of children) {
        if (
          child.boundingBox.left <= maxX &&
          child.boundingBox.right >= minX &&
          input <= child.boundingBox.top &&
          input >= child.boundingBox.bottom
        ) {
          output = child.solveInverse(input, minX, maxX)
          if (output !== undefined) {
            break
          }
        }
      }
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
