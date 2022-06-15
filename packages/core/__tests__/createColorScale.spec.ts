import { describe, test } from 'vitest'
import { createColorFromHSL } from '@chromatika/color-utils'
import { ColorRange } from '@chromatika/types'
import { createColorScale } from '../src'

describe('createColorScale', () => {
  const GREYSCALE = Array.from({ length: 11 }).map((_, i) => createColorFromHSL(0, 0, i * 10))

  test('it identifies unique colors', ({ expect }) => {
    const scale1 = createColorScale([
      {
        start: 0,
        startInclusive: true,
        end: 1,
        endInclusive: false,
        value: GREYSCALE[0],
      },
      {
        start: 1,
        startInclusive: true,
        end: 2,
        endInclusive: false,
        value: GREYSCALE[5],
      },
      {
        start: 2,
        startInclusive: true,
        end: 3,
        endInclusive: true,
        value: GREYSCALE[10],
      },
    ])
    expect(scale1.uniqueColors.size).toBe(3)

    const scale2 = createColorScale([
      {
        start: 0,
        startInclusive: true,
        end: 1,
        endInclusive: false,
        value: GREYSCALE[0],
      },
      {
        start: 1,
        startInclusive: true,
        end: 2,
        endInclusive: false,
        value: GREYSCALE[0],
      },
      {
        start: 2,
        startInclusive: true,
        end: 3,
        endInclusive: true,
        value: GREYSCALE[0],
      },
    ])
    expect(scale2.uniqueColors.size).toBe(1)
  })

  test('it gets the range for a color input', ({ expect }) => {
    const range1: ColorRange = {
      start: 0,
      startInclusive: true,
      end: 1,
      endInclusive: false,
      value: GREYSCALE[0],
    }
    const range2: ColorRange = {
      start: 1,
      startInclusive: true,
      end: 2,
      endInclusive: false,
      value: GREYSCALE[5],
    }
    const scale = createColorScale([range1, range2])

    expect(scale.rangeFor(0)).toBe(range1)
    expect(scale.rangeFor(GREYSCALE[0])).toBe(range1)
    expect(scale.rangeFor('#000')).toBe(range1)
    expect(scale.rangeFor('rgb(128, 128, 128)')).toBe(range2)
    expect(scale.rangeFor('#0000')).toBeUndefined()
    expect(scale.rangeFor(5)).toBeUndefined()
    expect(scale.rangeFor(GREYSCALE[10])).toBeUndefined()
  })

  test('it identifies that it has a color', ({ expect }) => {
    const scale = createColorScale([
      {
        start: 0,
        startInclusive: true,
        end: 1,
        endInclusive: false,
        value: GREYSCALE[0],
      },
      {
        start: 1,
        startInclusive: true,
        end: 2,
        endInclusive: false,
        value: GREYSCALE[5],
      },
    ])

    expect(scale.has(GREYSCALE[0])).toBe(true)
    expect(scale.has('rgb(0, 0, 0)')).toBe(true)
    expect(scale.has('rgb(0,0,0)')).toBe(true)
    expect(scale.has(0)).toBe(true)
    expect(scale.has(GREYSCALE[5])).toBe(true)

    expect(scale.has(GREYSCALE[10])).toBe(false)
    expect(scale.has(3)).toBe(false)
  })

  test('it gets the color at a number', ({ expect }) => {
    const scale = createColorScale([
      {
        start: 0,
        startInclusive: true,
        end: 1,
        endInclusive: false,
        value: GREYSCALE[0],
      },
      {
        start: 1,
        startInclusive: true,
        end: 2,
        endInclusive: false,
        value: GREYSCALE[5],
      },
      {
        start: 2,
        startInclusive: true,
        end: 3,
        endInclusive: true,
        value: GREYSCALE[10],
      },
    ])

    expect(scale.at(0)).toBe(GREYSCALE[0])
    expect(scale.at(0.5)).toBe(GREYSCALE[0])
    expect(scale.at(1)).toBe(GREYSCALE[5])
    expect(scale.at(1.5)).toBe(GREYSCALE[5])
    expect(scale.at(2)).toBe(GREYSCALE[10])
    expect(scale.at(2.5)).toBe(GREYSCALE[10])
    expect(scale.at(3)).toBe(GREYSCALE[10])
  })

  test('it finds contrasting colors', ({ expect }) => {
    const scale = createColorScale(
      GREYSCALE.map((color, index) => ({
        start: index,
        startInclusive: true,
        end: index + 1,
        endInclusive: index === GREYSCALE.length - 1,
        value: color,
      }))
    )

    expect(scale.ratioFrom(5, 2, 'before')).toBe(GREYSCALE[3])
    expect(scale.ratioFrom(5, 2, 'after')).toBe(GREYSCALE[8])
    expect(scale.ratioFrom(5, 2, 'nearest')).toBe(GREYSCALE[3])
    expect(scale.ratioFrom(5, 2, 'furthest')).toBe(GREYSCALE[8])
    expect(scale.ratioFrom(5, 2, 'darkest')).toBe(GREYSCALE[3])
    expect(scale.ratioFrom(5, 2, 'lightest')).toBe(GREYSCALE[8])
    expect(scale.ratioFrom(5, 'aaa', 'nearest')).toBeUndefined()
  })
})
