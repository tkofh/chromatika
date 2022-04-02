import { describe, test, expect } from 'vitest'
import { clamp, lerp, normalize, remap, roundTo } from '../src'

describe('clamp', () => {
  test('it clamps ', () => {
    expect(clamp(-1)).toBe(0)
    expect(clamp(2)).toBe(1)

    expect(clamp(-1, 0, 1)).toBe(0)
    expect(clamp(0, 0, 1)).toBe(0)
    expect(clamp(0.5, 0, 1)).toBe(0.5)
    expect(clamp(1, 0, 1)).toBe(1)
    expect(clamp(2, 0, 1)).toBe(1)
  })
})

describe('lerp', () => {
  test('it lerps a regular range', () => {
    expect(lerp(0, 0, 10)).toBe(0)
    expect(lerp(1, 0, 10)).toBe(10)
    expect(lerp(0.5, 0, 10)).toBe(5)
  })

  test('it lerps an inverted range', () => {
    expect(lerp(0, 0, -10)).toBe(0)
    expect(lerp(1, 0, -10)).toBe(-10)
    expect(lerp(0.5, 0, -10)).toBe(-5)
  })

  test('it clamps a regular range by default', () => {
    expect(lerp(1.5, 0, 10)).toBe(10)
    expect(lerp(-0.5, 0, 10)).toBe(0)
  })

  test('it extrapolates a regular range', () => {
    expect(lerp(1.5, 0, 10, false)).toBe(15)
    expect(lerp(-0.5, 0, 10, false)).toBe(-5)
  })

  test('it clamps an inverted range by default', () => {
    expect(lerp(1.5, 0, -10)).toBe(-10)
    expect(lerp(-0.5, 0, -10)).toBe(0)
  })

  test('it extrapolates an inverted range', () => {
    expect(lerp(1.5, 0, -10, false)).toBe(-15)
    expect(lerp(-0.5, 0, -10, false)).toBe(5)
  })
})

describe('normalize', () => {
  test('it throws on a zero-sized range', () => {
    expect(() => normalize(0, 0, 0)).toThrow()
  })

  test('it normalizes a regular range', () => {
    expect(normalize(0, 0, 10)).toBe(0)
    expect(normalize(5, 0, 10)).toBe(0.5)
    expect(normalize(10, 0, 10)).toBe(1)
  })

  test('it normalizes an inverted range', () => {
    expect(normalize(0, 0, -10)).toBe(0)
    expect(normalize(-5, 0, -10)).toBe(0.5)
    expect(normalize(-10, 0, -10)).toBe(1)
  })

  test('it extrapolates a regular range', () => {
    expect(normalize(15, 0, 10)).toBe(1.5)
    expect(normalize(-5, 0, 10)).toBe(-0.5)
  })

  test('it extrapolates an inverted range', () => {
    expect(normalize(-15, 0, -10)).toBe(1.5)
    expect(normalize(5, 0, -10)).toBe(-0.5)
  })
})

describe('remap', () => {
  test('it throws on a zero-sized range', () => {
    expect(() => remap(0, 0, 0, 0, 10)).toThrow()
  })

  test('it remaps regular and inverted ranges', () => {
    expect(remap(5, 0, 10, 10, 20)).toBe(15)
    expect(remap(2.5, 0, 10, 20, 10)).toBe(17.5)
    expect(remap(-5, 0, -10, 0, 100)).toBe(50)
    expect(remap(-10, 0, -10, 100, 50)).toBe(50)
  })

  test('it clamps regular and inverted ranges by default', () => {
    expect(remap(-5, 0, 10, 0, 100)).toBe(0)
    expect(remap(15, 0, 10, 100, 0)).toBe(0)
    expect(remap(-15, 0, -10, 0, 100)).toBe(100)
    expect(remap(5, 0, -10, 0, 100)).toBe(0)
  })

  test('it extrapolates regular and inverted ranges', () => {
    expect(remap(-5, 0, 10, 0, 100, false)).toBe(-50)
    expect(remap(15, 0, 10, 100, 0, false)).toBe(-50)
    expect(remap(-15, 0, -10, 0, 100, false)).toBe(150)
    expect(remap(5, 0, -10, 0, 100, false)).toBe(-50)
  })
})

describe('roundTo', () => {
  test('it throws for invalid precisions', () => {
    expect(() => roundTo(10, 0)).toThrow()
    expect(() => roundTo(10, 0.1)).toThrow()
    expect(() => roundTo(10, -10)).toThrow()
  })

  test('it rounds to the given precision', () => {
    expect(roundTo(1.23456, 1)).toBe(1.2)
    expect(roundTo(1.23456, 2)).toBe(1.23)
    expect(roundTo(1.23456, 3)).toBe(1.235)
  })
})