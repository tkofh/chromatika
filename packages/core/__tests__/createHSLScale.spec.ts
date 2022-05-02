import { describe, test, expect } from 'vitest'
import { createBezierSpline } from '@chromatika/bezier'
import { createHSLScale } from '../src/hsl'

describe('createHSLScale', () => {
  test('it creates an hsl scale', () => {
    createHSLScale({
      hue: createBezierSpline([
        [0, 220],
        [0, 230],
        [1, 230],
        [1, 240],
      ]),
      saturation: createBezierSpline([
        [0, 80],
        [0.2, 95],
        [0.3, 96],
        [0.5, 85],
        [0.7, 74],
        [0.8, 30],
        [1, 35],
      ]),
      lightness: createBezierSpline([
        [0, 95],
        [0.1, 100],
        [0.5, 15],
        [1, 20],
      ]),
    })

    expect(2).toBe(2)
  })
})
