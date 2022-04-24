import { describe, test, expect } from 'vitest'
import { createBezierSpline } from '../src'

describe('createBezierSolver', () => {
  test('it throws on an invalid number of points', () => {
    expect(() => createBezierSpline([[0, 0]])).toThrowError(
      'At least one cubic segment must be provided'
    )
    expect(() =>
      createBezierSpline([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ])
    ).toThrowError('Invalid number of points provided (must have 3n+1 points)')
  })

  test('it throws when a negative-x curve is passed', () => {
    expect(() =>
      createBezierSpline([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ])
    ).toThrowError(`Curve [0, 0], [1, 0], [1, 1], [0, 1] is not monotonically positive`)
  })

  test('it properly merges bounding boxes and extrema of multiple children', () => {
    const spline = createBezierSpline(
      [
        [0, 0],
        [0.125, 5],
        [0.375, 5],
        [0.5, 0.5],
        [0.625, -4],
        [0.875, -4],
        [1, 1],
      ],
      { precision: 2 }
    )
    expect(spline.boundingBox).toStrictEqual({ top: 3.81, bottom: -2.81, left: 0, right: 1 })
    expect(spline.extrema).toStrictEqual([
      [0, 0],
      [0.26, 3.81],
      [0.75, -2.81],
      [1, 1],
    ])
  })

  test('it correctly solves and inverse solves the combined spline', () => {
    const spline = createBezierSpline(
      [
        [0, 0],
        [0.125, 0],
        [0.375, 0.5],
        [0.5, 0.5],
        [0.625, 0.5],
        [0.875, 1],
        [1, 1],
      ],
      { precision: 2 }
    )

    for (let i = 0; i <= 100; i++) {
      const y = spline.solve(i / 100)!
      const x = spline.solveInverse(y)!
      expect(spline.solve(x)).toBe(y)
    }
  })

  test.only('it respects solveInverse min/max x', () => {
    const spline = createBezierSpline(
      [
        [0, 0],
        [0.125, 5],
        [0.375, 5],
        [0.5, 0.5],
        [0.625, -4],
        [0.875, -4],
        [1, 1],
      ],
      { precision: 2 }
    )

    expect(spline.solveInverse(0.7, 0, 0.01)).toBe(undefined)
    expect(spline.solveInverse(0.7, 0, 0.03)).toBe(0.02)
    expect(spline.solveInverse(0.7, 0.03, 0.48)).toBe(undefined)
    expect(spline.solveInverse(0.7, 0.03, 0.5)).toBe(0.49)
    expect(spline.solveInverse(0.7, 0.5, 0.98)).toBe(undefined)
    expect(spline.solveInverse(0.7, 0.5, 1)).toBe(0.99)
  })
})
