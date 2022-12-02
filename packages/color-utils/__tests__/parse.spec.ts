import { describe, test } from 'vitest'
import { parseHexString, parseRGBString } from '../src/'

describe('parseHexString', () => {
  test('it parses a shorthand hex string', ({ expect }) => {
    expect(parseHexString('#000')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
    expect(parseHexString('#fff')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it parses a expanded hex string', ({ expect }) => {
    expect(parseHexString('#000000')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
    expect(parseHexString('#ffffff')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it throws for invalid hex strings', ({ expect }) => {
    expect(() => parseHexString('#00')).toThrowError(
      'Invalid hex code input #00: Please use a valid hex code (including the # at the start)'
    )

    expect(() => parseHexString('#0000000000')).toThrowError(
      'Invalid hex code input #0000000000: Please use a valid hex code (including the # at the start)'
    )

    expect(() => parseHexString('#ggg')).toThrowError(
      'Invalid hex code input #ggg: Please use a valid hex code (including the # at the start)'
    )

    expect(() => parseHexString('#fffff')).toThrowError(
      'Invalid hex code input #fffff: Please use a valid hex code (including the # at the start)'
    )

    expect(() => parseHexString('#fffffff')).toThrowError(
      'Invalid hex code input #fffffff: Please use a valid hex code (including the # at the start)'
    )
  })

  test("it normalizes and doesn't normalize properly", ({ expect }) => {
    expect(parseHexString('#fff', true)).toStrictEqual({
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    })
    expect(parseHexString('#fff', false)).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })
})

describe('parseRGBString', () => {
  test('it parses a rgb string', ({ expect }) => {
    expect(parseRGBString('rgb(0, 0, 0)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
    expect(parseRGBString('rgb(255,255,255)')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it throws for invalid rgb strings', ({ expect }) => {
    expect(() => parseRGBString('hello world')).toThrowError(
      'Invalid RGB hello world: Input must be a valid CSS RGB String'
    )

    expect(() => parseRGBString('rgb(255,)')).toThrowError(
      'Invalid RGB rgb(255,): Input must be a valid CSS RGB String'
    )

    expect(() => parseRGBString('rgb(25000, foo, 123123)')).toThrowError(
      'Invalid RGB rgb(25000, foo, 123123): Input must be a valid CSS RGB String'
    )

    expect(() => parseRGBString('rgb(250, 250, 250, 1)')).toThrowError(
      'Invalid RGB rgb(250, 250, 250, 1): Input must be a valid CSS RGB String'
    )

    expect(() => parseRGBString('rgba(250, 250, 250, 1.)')).toThrowError(
      'Invalid RGB rgba(250, 250, 250, 1.): Input must be a valid CSS RGB String'
    )
  })

  test("it normalizes and doesn't normalize properly", ({ expect }) => {
    expect(parseRGBString('rgb(255, 255, 255)', true)).toStrictEqual({
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    })
    expect(parseRGBString('rgb(255, 255, 255)', false)).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })
})
