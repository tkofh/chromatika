import { CubicPoints, Points, SplineFactory } from '@chromatika/shared'
import { remap, roundTo } from '@chromatika/utils'
import { isMonotonicallyPositive } from './validation'

interface CreateBezierOptions {
  totalLUTResolution?: number
  precision?: number
}

const DEFAULT_TOTAL_LUT_RESOLUTION = 512
const DEFAULT_PRECISION = 4

export const createBezierSolver: SplineFactory<CreateBezierOptions> = (points, options) => {
  if (points.length < 4) {
    throw new Error('At least one cubic segment must be provided')
  }

  if ((points.length - 1) % 3 !== 0) {
    throw new Error('Invalid number of points provided (must have 3n+1 points)')
  }

  const min = points[0][0]
  const max = points[points.length - 1][0]

  // total distance along the x-axis this curve travels
  const totalRange = max - min

  // number of points that sit along the curve
  const fixedPointCount = (points.length - 1) / 3

  // total number of intermediate steps to compute across all curve segments
  // due to rounding, this may end up as only an approximation
  const totalLUTResolution =
    (options?.totalLUTResolution ?? DEFAULT_TOTAL_LUT_RESOLUTION) - (fixedPointCount * 2 - 1)

  const precision = options?.precision ?? DEFAULT_PRECISION

  const segments: CubicPoints[] = []
  const lookUpTables = new Map<CubicPoints, Points>()

  const resultCache = new Map<number, number>()

  for (let i = 0; i < fixedPointCount; i++) {
    const segment: CubicPoints = [
      points[i * 3],
      points[i * 3 + 1],
      points[i * 3 + 2],
      points[i * 3 + 3],
    ]

    if (!isMonotonicallyPositive(segment[0][0], segment[1][0], segment[2][0], segment[3][0])) {
      throw new Error(`Curve ${segment.join(', ')} returns more than one y value at some x value`)
    }

    segments.push(segment)

    resultCache.set(segment[0][0], segment[0][1])
    resultCache.set(segment[3][0], segment[3][1])

    const lutResolution = Math.ceil(
      remap(segment[3][0] - segment[0][0], 0, totalRange, 0, totalLUTResolution)
    )

    const lookUpTable: Points = []

    lookUpTable.push(segment[0])

    for (let j = 0; j < lutResolution; j++) {
      const t = (j + 1) / (lutResolution + 1)

      lookUpTable.push([
        segment[0][0] * (-(t * t * t) + 3 * t * t - 3 * t + 1) +
          segment[1][0] * (3 * t * t * t - 6 * t * t + 3 * t) +
          segment[2][0] * (-3 * t * t * t + 3 * t * t) +
          segment[3][0] * t * t * t,
        segment[0][1] * (-(t * t * t) + 3 * t * t - 3 * t + 1) +
          segment[1][1] * (3 * t * t * t - 6 * t * t + 3 * t) +
          segment[2][1] * (-3 * t * t * t + 3 * t * t) +
          segment[3][1] * t * t * t,
      ])
    }
    lookUpTable.push(segment[3])

    lookUpTables.set(segment, lookUpTable)
  }

  const solve = (x: number): number => {
    if (x < min) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined below ${min}`)
    }
    if (x > max) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined above ${max}`)
    }

    if (resultCache.has(x)) {
      return resultCache.get(x)!
    }

    let lookUpTable!: Points
    for (const segment of segments) {
      if (x > segment[0][0] && x < segment[3][0]) {
        lookUpTable = lookUpTables.get(segment)!
      }
    }

    let output!: number
    for (let i = 0; i < lookUpTable.length - 1; i++) {
      const start = lookUpTable[i]
      const end = lookUpTable[i + 1]

      if (x === start[0]) {
        output = start[1]
        break
      } else if (x === end[0]) {
        output = end[1]
        break
      } else if (x > start[0] && x < end[0]) {
        output = remap(x, start[0], end[0], start[1], end[1])
        break
      }
    }

    output = roundTo(output, precision)

    resultCache.set(x, output)

    return output
  }

  return {
    solve,
  }
}
