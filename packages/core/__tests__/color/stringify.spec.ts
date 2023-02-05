import { describe, test } from 'vitest'
import { expandHexString, getHexString, getHSLString, getRGBString } from '../../src'

describe('expandHexString', () => {
  test('it expands hex strings', ({ expect }) => {
    expect(expandHexString('#000')).toBe('#000000')
    expect(expandHexString('#0000')).toBe('#00000000')
    expect(expandHexString('#f6f6f6')).toBe('#f6f6f6')
    expect(expandHexString('#f6f6f6f6')).toBe('#f6f6f6f6')
  })
})

describe('getHexString', () => {
  test('it generates hex strings', ({ expect }) => {
    expect(getHexString(0, 0, 0)).toBe('#000000')
    expect(getHexString(255, 255, 255)).toBe('#ffffff')
    expect(getHexString(128, 128, 128)).toBe('#808080')
    expect(getHexString(0, 0, 0, 0)).toBe('#00000000')
  })
})

describe('getHSLString', () => {
  test('it generates hsl strings', ({ expect }) => {
    expect(getHSLString(0, 0, 0)).toBe('hsl(0deg 0% 0%)')
    expect(getHSLString(240, 100, 100)).toBe('hsl(240deg 100% 100%)')
    expect(getHSLString(240, 100, 100, 1)).toBe('hsl(240deg 100% 100% / 1)')
  })
})

describe('getRGBString', () => {
  test('it generates rgb strings', ({ expect }) => {
    expect(getRGBString(0, 0, 0)).toBe('rgb(0 0 0)')
    expect(getRGBString(255, 255, 255)).toBe('rgb(255 255 255)')
    expect(getRGBString(255, 255, 255, 1)).toBe('rgb(255 255 255 / 1)')
  })
})
