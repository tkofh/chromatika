import { describe, test, expect } from 'vitest'
import { getHexString, getHSLString, getRGBString } from '../src'

describe('getHexString', () => {
  test('it generates hex strings', () => {
    expect(getHexString(0, 0, 0)).toBe('#000000')
    expect(getHexString(1, 1, 1)).toBe('#ffffff')
    expect(getHexString(0.5, 0.5, 0.5)).toBe('#808080')
  })
})

describe('getHSLString', () => {
  test('it generates hsl strings', () => {
    expect(getHSLString(0, 0, 0)).toBe('hsl(0deg, 0%, 0%)')
    expect(getHSLString(240, 1, 1)).toBe('hsl(240deg, 100%, 100%)')
  })
})

describe('getRGBString', () => {
  test('it generates rgb strings', () => {
    expect(getRGBString(0, 0, 0)).toBe('rgb(0, 0, 0)')
    expect(getRGBString(1, 1, 1)).toBe('rgb(255, 255, 255)')
  })
})
