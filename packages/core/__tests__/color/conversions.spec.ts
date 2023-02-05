import { test } from 'vitest'
import { convertHSLToRGB, convertRGBToHSL } from '../../src'

test('hsl to rgb', ({ expect }) => {
  expect(convertHSLToRGB(0, 0, 0)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
  })
  expect(convertHSLToRGB(0, 0, 100)).toStrictEqual({
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
  })
  expect(convertHSLToRGB(0, 0, 50)).toStrictEqual({
    red: 128,
    green: 128,
    blue: 128,
    alpha: 1,
  })
  expect(convertHSLToRGB(0, 100, 50)).toStrictEqual({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
  })
  expect(convertHSLToRGB(120, 100, 50)).toStrictEqual({
    red: 0,
    green: 255,
    blue: 0,
    alpha: 1,
  })
  expect(convertHSLToRGB(240, 100, 50)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 255,
    alpha: 1,
  })
  expect(convertHSLToRGB(0, 0, 0, 1)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
  })
  expect(convertHSLToRGB(0, 0, 0, 0.5)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0.5,
  })
})

test('rgb to hsl', ({ expect }) => {
  expect(convertRGBToHSL(0, 0, 0)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 0,
    alpha: 1,
  })
  expect(convertRGBToHSL(255, 255, 255)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 100,
    alpha: 1,
  })
  expect(convertRGBToHSL(128, 128, 128)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 50,
    alpha: 1,
  })
  expect(convertRGBToHSL(255, 0, 0)).toStrictEqual({
    hue: 0,
    saturation: 100,
    lightness: 50,
    alpha: 1,
  })
  expect(convertRGBToHSL(0, 255, 0)).toStrictEqual({
    hue: 120,
    saturation: 100,
    lightness: 50,
    alpha: 1,
  })
  expect(convertRGBToHSL(0, 0, 255)).toStrictEqual({
    hue: 240,
    saturation: 100,
    lightness: 50,
    alpha: 1,
  })
  expect(convertRGBToHSL(0, 0, 0, 1)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 0,
    alpha: 1,
  })
  expect(convertRGBToHSL(0, 0, 0, 0.5)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 0,
    alpha: 0.5,
  })
})
