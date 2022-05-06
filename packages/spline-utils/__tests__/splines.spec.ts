import { describe, test, expect } from 'vitest'
import { Rect } from '@chromatika/types'
import { roundTo, lerp } from '@chromatika/math'
import { createBezierSpline } from '@chromatika/bezier'
import { remapSpline, getSplineThresholds } from '../src'

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

describe('getSplineThresholds', () => {
  test('it finds spline thresholds', () => {
    const spline = createBezierSpline([
      [0, 220],
      [0.2, 320],
      [0.8, 140],
      [1, 240],
    ])

    const inputPrecision = 3
    const outputPrecision = 0

    const thresholds = getSplineThresholds(spline, inputPrecision, outputPrecision)

    for (const threshold of thresholds) {
      const rangeMidpoint = roundTo(lerp(0.5, threshold.start, threshold.end), inputPrecision + 1)
      expect(roundTo(spline.solve(rangeMidpoint)!, outputPrecision)).toBe(threshold.value)
    }
  })

  test('it finds spline thresholds when extrema are collapsed due to rounding', () => {
    const spline = createBezierSpline([
      [0, 95],
      [0.1, 100],
      [0.5, 10],
      [1, 18],
    ])

    const inputPrecision = 3
    const outputPrecision = 0

    const thresholds = getSplineThresholds(spline, inputPrecision, outputPrecision)

    for (const threshold of thresholds) {
      const rangeMidpoint = roundTo(lerp(0.5, threshold.start, threshold.end), inputPrecision + 1)
      expect(roundTo(spline.solve(rangeMidpoint)!, outputPrecision)).toBe(threshold.value)
    }
  })
})
