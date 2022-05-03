import { test, expect } from 'vitest'
import { convertHSLToRGB, convertRGBToHSL } from '../src'

test('hsl to rgb', () => {
  expect(convertHSLToRGB(0, 0, 0)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 0,
  })
  expect(convertHSLToRGB(0, 0, 1)).toStrictEqual({
    red: 1,
    green: 1,
    blue: 1,
  })
  expect(convertHSLToRGB(0, 0, 0.5)).toStrictEqual({
    red: 0.5,
    green: 0.5,
    blue: 0.5,
  })
  expect(convertHSLToRGB(0, 1, 0.5)).toStrictEqual({
    red: 1,
    green: 0,
    blue: 0,
  })
  expect(convertHSLToRGB(120, 1, 0.5)).toStrictEqual({
    red: 0,
    green: 1,
    blue: 0,
  })
  expect(convertHSLToRGB(240, 1, 0.5)).toStrictEqual({
    red: 0,
    green: 0,
    blue: 1,
  })
})

test('rgb to hsl', () => {
  expect(convertRGBToHSL(0, 0, 0)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 0,
  })
  expect(convertRGBToHSL(1, 1, 1)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 1,
  })
  expect(convertRGBToHSL(0.5, 0.5, 0.5)).toStrictEqual({
    hue: 0,
    saturation: 0,
    lightness: 0.5,
  })
  expect(convertRGBToHSL(1, 0, 0)).toStrictEqual({
    hue: 0,
    saturation: 1,
    lightness: 0.5,
  })
  expect(convertRGBToHSL(0, 1, 0)).toStrictEqual({
    hue: 120,
    saturation: 1,
    lightness: 0.5,
  })
  expect(convertRGBToHSL(0, 0, 1)).toStrictEqual({
    hue: 240,
    saturation: 1,
    lightness: 0.5,
  })
})
