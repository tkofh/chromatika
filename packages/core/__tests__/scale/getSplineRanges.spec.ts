import { describe, test } from 'vitest'
import { createCubicCatmullRomSpline } from '@curvy/catmull-rom'
import { roundTo } from 'micro-math'
import { getSplineRanges } from '../../src/scale/'

describe('getSplineRanges', () => {
  test('it creates mutually exclusive ranges of one axes for every value of another axis', ({
    expect,
  }) => {
    const spline = createCubicCatmullRomSpline(
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 25, y: 50 },
        { x: 50, y: 25 },
        { x: 75, y: 100 },
        { x: 100, y: 75 },
        { x: 100, y: 75 },
      ],
      { x: 1, y: 0 }
    )

    const ranges = getSplineRanges(spline, 'x', 'y')

    expect(ranges[0].start).toBe(spline.solveT(0).x)
    expect(ranges[0].value).toBe(spline.solveT(0).y)

    const stepX = Math.pow(10, spline.precision.x * -1)

    for (let i = 0; i < ranges.length - 1; i++) {
      expect(roundTo(ranges[i].end + stepX, spline.precision.x)).toBe(ranges[i + 1].start)
    }

    expect(ranges[ranges.length - 1].end).toBe(spline.solveT(1).x)
    expect(ranges[ranges.length - 1].value).toBe(spline.solveT(1).y)
  })

  test('it handles horizontal lines', ({ expect }) => {
    const spline = createCubicCatmullRomSpline<'x' | 'y'>([
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 0 },
      ],
    ])

    const ranges = getSplineRanges(spline, 'x', 'y')

    expect(ranges).toStrictEqual([{ start: 0, end: 100, value: 0 }])
  })
})
