import { describe, test } from 'vitest'
import { createHSLScale } from '../../src'
import { createCubicCatmullRomSpline } from '@curvy/catmull-rom'

describe('createHSLScale', () => {
  test('it works with points', ({ expect }) => {
    const scale = createHSLScale({
      hue: [
        { shade: 0, hue: 0 },
        { shade: 0.25, hue: 50 },
        { shade: 0.5, hue: 25 },
        { shade: 0.75, hue: 100 },
        { shade: 1, hue: 75 },
      ],
      saturation: [
        { shade: 0, saturation: 0 },
        { shade: 1, saturation: 100 },
      ],
      lightness: [
        { shade: 0, lightness: 0 },
        { shade: 1, lightness: 100 },
      ],
    })

    expect(scale.at(0).hsl).toBe(`hsl(0deg 0% 0%)`)
  })

  test.only('it works with curves', ({ expect }) => {
    const scale = createHSLScale({
      hue: createCubicCatmullRomSpline(
        [
          {
            shade: 0,
            hue: 0,
          },
          {
            shade: 0,
            hue: 0,
          },
          {
            shade: 300,
            hue: -130,
          },
          {
            shade: 1000,
            hue: 360,
          },
          {
            shade: 1000,
            hue: 360,
          },
        ],
        { shade: 0, hue: 0 },
        500
      ),
      saturation: createCubicCatmullRomSpline(
        [
          {
            shade: 0,
            saturation: 80,
          },
          {
            shade: 0,
            saturation: 80,
          },
          {
            shade: 250,
            saturation: 50,
          },
          {
            shade: 500,
            saturation: 90,
          },
          {
            shade: 600,
            saturation: 30,
          },
          {
            shade: 1000,
            saturation: 80,
          },
          {
            shade: 1000,
            saturation: 80,
          },
        ],
        { shade: 0, saturation: 0 },
        500
      ),
      lightness: createCubicCatmullRomSpline(
        [
          {
            shade: 0,
            lightness: 60,
          },
          {
            shade: 0,
            lightness: 60,
          },
          {
            shade: 500,
            lightness: 40,
          },
          {
            shade: 1000,
            lightness: 60,
          },
          {
            shade: 1000,
            lightness: 60,
          },
        ],
        { shade: 0, lightness: 0 },
        500
      ),
    })

    console.log(scale.colors[scale.colors.length - 1])

    expect(scale.at(0)).toBeDefined()
  })
})
