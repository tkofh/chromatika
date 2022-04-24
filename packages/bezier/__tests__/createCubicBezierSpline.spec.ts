import { describe, test, expect } from 'vitest'
import { createCubicBezierSpline } from '../src/createCubicBezierSpline'

describe('createCubicBezierSpline', () => {
  describe('x component monotonicity', () => {
    test('it errors for non monotonically positive x curves', () => {
      expect(() =>
        createCubicBezierSpline([
          [0, 0],
          [-0.5, 0.5],
          [1.5, 0.5],
          [1, 1],
        ])
      ).toThrowError('Curve [0, 0], [-0.5, 0.5], [1.5, 0.5], [1, 1] is not monotonically positive')
    })
  })
  describe('bounds and extrema', () => {
    test('it calculates bounding box and extrema for curve with no local y extrema', () => {
      const spline = createCubicBezierSpline(
        [
          [0, 0],
          [0.5, 0],
          [0.5, 1],
          [1, 1],
        ],
        { precision: 2 }
      )
      expect(spline.extrema).toStrictEqual([
        [0, 0],
        [1, 1],
      ])
      expect(spline.boundingBox).toStrictEqual({ top: 1, bottom: 0, left: 0, right: 1 })
    })
    test('it calculates bounding box and extrema for curve with local y extrema but no global y extrema', () => {
      const spline = createCubicBezierSpline(
        [
          [0, 0],
          [0.25, 2],
          [0.75, -1],
          [1, 1],
        ],
        { precision: 2 }
      )
      expect(spline.extrema).toStrictEqual([
        [0, 0],
        [0.25, 0.72],
        [0.75, 0.28],
        [1, 1],
      ])
      expect(spline.boundingBox).toStrictEqual({ top: 1, left: 0, right: 1, bottom: 0 })
    })
    test('it calculates bounding box and extrema for curve with global y extrema', () => {
      const spline = createCubicBezierSpline(
        [
          [0, 0],
          [0.25, 5],
          [0.75, -4],
          [1, 1],
        ],
        { precision: 2 }
      )

      expect(2).toBe(2)
      expect(spline.extrema).toStrictEqual([
        [0, 0],
        [0.21, 1.57],
        [0.79, -0.57],
        [1, 1],
      ])
      expect(spline.boundingBox).toStrictEqual({ top: 1.57, left: 0, bottom: -0.57, right: 1 })
    })
  })
  describe('solver and inverse solver', () => {
    test('it solves and inverse solves a curve', () => {
      const spline1 = createCubicBezierSpline(
        [
          [0, 0],
          [0.25, 0.25],
          [0.75, 0.75],
          [1, 1],
        ],
        { precision: 2 }
      )

      const spline2 = createCubicBezierSpline(
        [
          [0, 0],
          [0.5, 0],
          [0.5, 1],
          [1, 1],
        ],
        { precision: 2 }
      )

      for (let i = 0; i <= 100; i++) {
        const y1 = spline1.solve(i / 100)!
        const x1 = spline1.solveInverse(y1)!
        expect(spline1.solve(x1)).toBe(y1)

        const y2 = spline2.solve(i / 100)!
        const x2 = spline2.solveInverse(y2)!
        expect(spline2.solve(x2)).toBe(y2)
      }
    })
    test('inverse solve respects min/max x', () => {
      const spline = createCubicBezierSpline(
        [
          [0, 0],
          [0.25, 5],
          [0.75, -4],
          [1, 1],
        ],
        { precision: 2 }
      )

      expect(2).toBe(2)

      expect(spline.solveInverse(0.7, 0, 0.03)).toBe(undefined)
      expect(spline.solveInverse(0.7, 0, 0.05)).toBe(0.04)

      expect(spline.solveInverse(0.7, 0.05, 0.45)).toBe(undefined)
      expect(spline.solveInverse(0.7, 0.05, 0.47)).toBe(0.46)

      expect(spline.solveInverse(0.7, 0.47, 0.97)).toBe(undefined)
      expect(spline.solveInverse(0.7, 0.47, 1)).toBe(0.98)

      expect(spline.solveInverse(0.7, 0.99, 1)).toBe(undefined)
    })
  })
})
