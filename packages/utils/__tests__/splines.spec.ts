import { describe, test, expect } from 'vitest'
import { createBezierSpline } from '@chromatika/bezier'
import { Rect } from '@chromatika/shared'
import { remapSpline } from '../src'

describe('remapSpline', () => {
  test('it remaps a spline', () => {
    const spline = createBezierSpline([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ])

    const target: Rect = { maxY: 20, minX: 10, minY: 10, maxX: 20 }

    const remapped = remapSpline(spline, target)

    expect(remapped.boundingBox).toStrictEqual(target)
    expect(remapped.extrema).toStrictEqual([
      [10, 10],
      [20, 20],
    ])

    expect(remapped.solve(10)).toBe(10)
    expect(remapped.solve(15)).toBe(15)
    expect(remapped.solve(20)).toBe(20)

    expect(remapped.solveInverse(10, 10, 20)).toBe(10)
  })
})
