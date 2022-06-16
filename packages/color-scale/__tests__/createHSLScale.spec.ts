import { describe, test } from 'vitest'
import { createHSLScale } from '../src'

describe('createHSLScale', () => {
  test('it creates a scale', ({ expect }) => {
    expect(2).toBe(2)

    const scale = createHSLScale({
      hue: [
        [0, 220],
        [0.5, 220],
        [0.5, 240],
        [1, 240],
      ],
      saturation: [
        [0, 80],
        [0.4, 70],
        [0.6, 30],
        [1, 20],
      ],
      lightness: [
        [0, 100],
        [0.25, 100],
        [0.75, 20],
        [1, 15],
      ],
    })

    for (let i = 220; i <= 240; i++) {
      expect(scale.colors.findIndex((range) => range.value.hue === i)).not.toBe(-1)
    }
    for (let i = 80; i >= 20; i--) {
      expect(scale.colors.findIndex((range) => range.value.saturation === i)).not.toBe(-1)
    }
    for (let i = 100; i >= 15; i--) {
      expect(scale.colors.findIndex((range) => range.value.lightness === i)).not.toBe(-1)
    }
  })

  test('it throws for invalid curves', ({ expect }) => {
    expect(() =>
      createHSLScale({
        hue: [
          [1, 220],
          [0.5, 220],
          [0.5, 240],
          [0, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue curve must be monotonically positive on the X axis')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [1, 80],
          [0.6, 70],
          [0.4, 30],
          [0, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Saturation curve must be monotonically positive on the X axis')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [1, 100],
          [0.75, 100],
          [0.25, 20],
          [0, 15],
        ],
      })
    ).toThrowError('Lightness curve must be monotonically positive on the X axis')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [2, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')

    expect(() =>
      createHSLScale({
        hue: [
          [-1, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [2, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [-1, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [0, 100],
          [0.25, 100],
          [0.75, 20],
          [2, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')

    expect(() =>
      createHSLScale({
        hue: [
          [0, 220],
          [0.5, 220],
          [0.5, 240],
          [1, 240],
        ],
        saturation: [
          [0, 80],
          [0.4, 70],
          [0.6, 30],
          [1, 20],
        ],
        lightness: [
          [-1, 100],
          [0.25, 100],
          [0.75, 20],
          [1, 15],
        ],
      })
    ).toThrowError('Hue, Saturation, and Lightness curves must share X axis start and end values')
  })
})
