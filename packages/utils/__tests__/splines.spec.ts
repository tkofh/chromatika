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

    const target: Rect = { top: 20, left: 10, bottom: 10, right: 20 }

    const remapped = remapSpline(spline, target)

    expect(remapped.boundingBox).toStrictEqual(target)
    expect(remapped.extrema).toStrictEqual([
      [10, 10],
      [20, 20],
    ])
  })
})
