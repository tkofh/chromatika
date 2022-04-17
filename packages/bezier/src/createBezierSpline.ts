import { CubicPoints, Points, SplineFactory, Point, Rect } from '@chromatika/shared'
import { remap, roundTo } from '@chromatika/utils'
import { createLookUpTable, LookUpTable } from './createLookUpTable'
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

  const splineMaxX = points[points.length - 1][0]
  const splineMinX = points[0][0]

  // number of points that sit along the curve
  const fixedPointCount = (points.length - 1) / 3

  // total number of intermediate steps to compute across all curve segments
  // due to rounding, this may end up as only an approximation
  const totalLUTResolution =
    (options?.totalLUTResolution ?? DEFAULT_TOTAL_LUT_RESOLUTION) - (fixedPointCount * 2 - 1)

  const segments: CubicPoints[] = []
  const lookUpTables = new Map<CubicPoints, LookUpTable>()

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

    if (dx.y0 < 0 || dx.roots.length > 0) {
      throw new Error(`Curve ${segment.join(', ')} returns more than one y value at some x value`)
    }

    segments.push(segment)

    resultCache.set(segment[0][0], segment[0][1])
    resultCache.set(segment[3][0], segment[3][1])

    const lookUpTable = createLookUpTable(
      segment,
      Math.ceil(
        remap(segment[3][0] - segment[0][0], 0, splineMaxX - splineMinX, 0, totalLUTResolution)
      )
    )

    lookUpTables.set(segment, lookUpTable)

    if (i === 0) {
      extremaCandidates.push(segment[0])
    }

    const dy = getDerivativeInfo(segment[0][1], segment[1][1], segment[2][1], segment[3][1])

    // just like with the x derivative, we want to ignore situations where
    // 1) there are no roots (roots[0] and roots[1] are undefined) and
    // 2) both roots are the same value (meaning the sign changes for one point only, and is thus not an extrema we care about)
    for (const root of dy.roots) {
      extremaCandidates.push(solveCubicBezier(root, segment))
    }

    extremaCandidates.push(segment[3])
  }

  const extrema: Points = []
  let splineMaxY = -Infinity
  let splineMinY = Infinity

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

      if (extreme[1] > splineMaxY) {
        splineMaxY = extreme[1]
      }
      if (extreme[1] < splineMinY) {
        splineMinY = extreme[1]
      }
    }
  }

  const boundingBox: Rect = {
    top: splineMaxY,
    right: splineMaxX,
    bottom: splineMinY,
    left: splineMinX,
  }

  const solve = (x: number): number => {
    if (x < splineMinX) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined below ${splineMinX}`)
    }
    if (x > splineMaxX) {
      throw new Error(`Cannot solve curve at ${x} because curve is undefined above ${splineMaxX}`)
    }

    if (resultCache.has(x)) {
      return resultCache.get(x)!
    }

    let lookUpTable!: LookUpTable
    for (const segment of segments) {
      if (x > segment[0][0] && x < segment[3][0]) {
        lookUpTable = lookUpTables.get(segment)!
      }
    }

    let output!: number
    for (let i = 0; i < lookUpTable.points.length - 1; i++) {
      const start = lookUpTable.points[i]
      const end = lookUpTable.points[i + 1]

      if (x === start[0]) {
        output = start[1]
        break
      } else if (x === end[0]) {
        output = end[1]
        break
      } else if (x > start[0] && x < end[0]) {
        output = remap(x, start[0], end[0], start[1], end[1], true, precision)
        break
      }
    }

    resultCache.set(x, output)

    return output
  }

  const solveInverse = (y: number, minX = splineMinX, maxX = splineMaxX): number => {
    if (y < splineMinY) {
      throw new Error(`Cannot solve curve at ${y} because curve is undefined below ${splineMinY}`)
    }
    if (y > splineMaxY) {
      throw new Error(`Cannot solve curve at ${y} because curve is undefined above ${splineMaxY}`)
    }

    let output!: number
    for (const segment of segments) {
      // first check if a segment is worth considering. it must have some overlap with our input x range
      if (segment[0][0] <= maxX && segment[3][0] >= minX) {
        const lookUpTable = lookUpTables.get(segment)!

        // next, determine if the associated look up table includes the y value we're looking for
        if (lookUpTable.bounds.bottom <= y && lookUpTable.bounds.top >= y) {
          for (let i = 0; i < lookUpTable.points.length - 1; i++) {
            const start = lookUpTable.points[i]
            const end = lookUpTable.points[i + 1]

            if ((start[0] === minX || start[1] === maxX) && start[1] === y) {
              output = start[0]
              break
            } else if ((end[0] === minX || end[0] === maxX) && end[1] === y) {
              output = end[0]
              break
            } else if (start[0] <= maxX && end[0] >= minX) {
              const lutSegYMin = Math.min(start[1], end[1])
              const lutSegYMax = Math.max(start[1], end[1])
              if (y > lutSegYMin && y < lutSegYMax) {
                const x = remap(y, start[1], end[1], start[0], end[0])
                if (x >= minX && x <= maxX) {
                  output = x
                  break
                }
              }
            }
          }

          if (output !== undefined) {
            break
          }
        }
      }
    }

    output = roundTo(output, precision)

    resultCache.set(output, y)

    return output
  }

  return {
    solve,
    solveInverse,
    extrema,
    boundingBox,
    precision,
  }
}
