import { describe, test, expect } from 'vitest'
import { Color } from '@chromatika/types'
import { createColorFromHSL, createColorFromRGB } from '../src'

const WHITE: Color = {
  hue: 0,
  saturation: 0,
  lightness: 100,
  red: 255,
  green: 255,
  blue: 255,
  rgb: 'rgb(255, 255, 255)',
  hsl: 'hsl(0deg, 0%, 100%)',
  hex: '#ffffff',
  relativeLuminance: 1,
}

const GREY: Color = {
  hue: 0,
  saturation: 0,
  lightness: 50,
  red: 128,
  green: 128,
  blue: 128,
  rgb: 'rgb(128, 128, 128)',
  hsl: 'hsl(0deg, 0%, 50%)',
  hex: '#808080',
  relativeLuminance: 0.2158605001138992,
}

const BLACK: Color = {
  hue: 0,
  saturation: 0,
  lightness: 0,
  red: 0,
  green: 0,
  blue: 0,
  rgb: 'rgb(0, 0, 0)',
  hsl: 'hsl(0deg, 0%, 0%)',
  hex: '#000000',
  relativeLuminance: 0,
}

describe('createColorFromHSL', () => {
  test('it creates colors', () => {
    expect(createColorFromHSL(0, 0, 100)).toStrictEqual(WHITE)
    expect(createColorFromHSL(0, 0, 50)).toStrictEqual(GREY)
    expect(createColorFromHSL(0, 0, 0)).toStrictEqual(BLACK)
  })
})

describe('createColorFromRGB', () => {
  test('it creates colors', () => {
    expect(createColorFromRGB(255, 255, 255)).toStrictEqual(WHITE)
    expect(createColorFromRGB(128, 128, 128)).toStrictEqual(GREY)
    expect(createColorFromRGB(0, 0, 0)).toStrictEqual(BLACK)
  })
})
