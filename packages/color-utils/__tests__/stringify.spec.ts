import { describe, test, expect } from 'vitest'
import { expandHexString, getHexString, getHSLString, getRGBString } from '../src'

describe('expandHexString', () => {
  test('it expands hex strings', () => {
    expect(expandHexString('#000')).toBe('#000000')
    expect(expandHexString('#f6f6f6')).toBe('#f6f6f6')
  })
})

describe('getHexString', () => {
  test('it generates hex strings', () => {
    expect(getHexString(0, 0, 0)).toBe('#000000')
    expect(getHexString(255, 255, 255)).toBe('#ffffff')
    expect(getHexString(128, 128, 128)).toBe('#808080')
  })
})

describe('getHSLString', () => {
  test('it generates hsl strings', () => {
    expect(getHSLString(0, 0, 0)).toBe('hsl(0deg, 0%, 0%)')
    expect(getHSLString(240, 100, 100)).toBe('hsl(240deg, 100%, 100%)')
  })
})

describe('getRGBString', () => {
  test('it generates rgb strings', () => {
    expect(getRGBString(0, 0, 0)).toBe('rgb(0, 0, 0)')
    expect(getRGBString(255, 255, 255)).toBe('rgb(255, 255, 255)')
  })
})
