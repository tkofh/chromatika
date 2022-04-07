import { CubicPoints, Points, SplineFactory, Rect, Point } from '@chromatika/shared'
import { remap, roundTo } from '@chromatika/utils'
import { createLookUpTable } from './createLookUpTable'
import { getDerivativeInfo } from './getDerivativeInfo'
import { solveCubicBezier } from './solvieCubicBezier'

interface CreateBezierOptions {
  totalLUTResolution?: number
  precision?: number
}

const DEFAULT_TOTAL_LUT_RESOLUTION = 512
const DEFAULT_PRECISION = 4

export const createBezierSpline: SplineFactory<CreateBezierOptions> = (points, options) => {
  if (points.length < 4) {
    throw new Error('At least one cubic segment must be provided')
  }

  if ((points.length - 1) % 3 !== 0) {
    throw new Error('Invalid number of points provided (must have 3n+1 points)')
  }

  const precision = options?.precision ?? DEFAULT_PRECISION

  const maxX = points[points.length - 1][0]
  const minX = points[0][0]

  // total distance along the x-axis this curve travels
  const totalRange = maxX - minX

  // number of points that sit along the curve
  const fixedPointCount = (points.length - 1) / 3

  // total number of intermediate steps to compute across all curve segments
  // due to rounding, this may end up as only an approximation
  const totalLUTResolution =
    (options?.totalLUTResolution ?? DEFAULT_TOTAL_LUT_RESOLUTION) - (fixedPointCount * 2 - 1)

  const segments: CubicPoints[] = []
  const lookUpTables = new Map<CubicPoints, Points>()

  const extremaCandidates: Points = []

  const resultCache = new Map<number, number>()

  for (let i = 0; i < fixedPointCount; i++) {
    const segment: CubicPoints = [
      points[i * 3],
      points[i * 3 + 1],
      points[i * 3 + 2],
      points[i * 3 + 3],
    ]

    const dx = getDerivativeInfo(segment[0][0], segment[1][0], segment[2][0], segment[3][0])

    if (dx.y0 < 0 || dx.roots[0] !== dx.roots[1]) {
      throw new Error(`Curve ${segment.join(', ')} returns more than one y value at some x value`)
    }

    segments.push(segment)

    resultCache.set(segment[0][0], segment[0][1])
    resultCache.set(segment[3][0], segment[3][1])

    const lookUpTable = createLookUpTable(
      segment,
      Math.ceil(remap(segment[3][0] - segment[0][0], 0, totalRange, 0, totalLUTResolution))
    )

    lookUpTables.set(segment, lookUpTable)

    if (i === 0) {
      extremaCandidates.push(segment[0])
    }

    const dy = getDerivativeInfo(segment[0][1], segment[1][1], segment[2][1], segment[3][1])

    // just like with the x derivative, we want to ignore situations where
    // 1) there are no roots (roots[0] and roots[1] are undefined) and
    // 2) both roots are the same value (meaning the sign changes for one point only, and is thus not an extrema we care about)
    if (dy.roots[0] !== dy.roots[1]) {
      for (const root of dy.roots) {
        extremaCandidates.push(solveCubicBezier(root, segment))
      }
    }
    extremaCandidates.push(segment[3])
  }

  const extrema: Points = []
  const boundingBox: Rect = {
    top: -Infinity,
    left: minX,
    bottom: Infinity,
    right: maxX,
  }

  for (let i = 0; i < extremaCandidates.length; i++) {
    let isExtrema = false

    // the first point, the second point, and the final point will always be extrema
    if (i === 0 || i === 1 || i === extremaCandidates.length - 1) {
      isExtrema = true
    } else {
      // the previous extrema is a minima if the point before it has a greater y value
      const previousIsMinima = extrema[extrema.length - 2][1] > extrema[extrema.length - 1][1]

      // the current point is an extrema if it is
      // - greater than the next point if the previous is a minima, or
      // - less than the next point if the previous is a maxima
      const currentIsExtrema = previousIsMinima
        ? extremaCandidates[i + 1][1] < extremaCandidates[i][1]
        : extremaCandidates[i + 1][1] > extremaCandidates[i][1]

      if (currentIsExtrema) {
        isExtrema = true
      }
    }

    if (isExtrema) {
      const extreme: Point = [
        roundTo(extremaCandidates[i][0], precision),
        roundTo(extremaCandidates[i][1], precision),
      ]

      extrema.push(extreme)

      if (extreme[1] > boundingBox.top) {
        boundingBox.top = extreme[1]
      }
      if (extreme[1] < boundingBox.bottom) {
        boundingBox.bottom = extreme[1]
      }
    }
  }

  const solve = (x: number): number => {
    if (x < minX) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined below ${minX}`)
    }
    if (x > maxX) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined above ${maxX}`)
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
    extrema,
    boundingBox,
    precision,
  }
}
