import { describe, test } from 'vitest'
import {
  parseHexString,
  parseRGBString,
  parseAngle,
  parseNumber,
  parsePercentage,
  tryParseAngle,
  tryParseNumber,
  parseHSLString,
} from '../src'

describe('parseAngle', () => {
  test('it parses degrees', ({ expect }) => {
    expect(parseAngle('10deg')).toBe(10)
  })
  test('it parses gradians', ({ expect }) => {
    expect(parseAngle('10grad')).toBe(10)
  })
  test('it parses radians', ({ expect }) => {
    expect(parseAngle('1rad')).toBe(1)
  })
  test('it parses turns', ({ expect }) => {
    expect(parseAngle('0.5turn')).toBe(0.5)
  })
  test('it throws for missing unit', ({ expect }) => {
    expect(() => parseAngle('10')).toThrowError(`Cannot parse angle 10`)
  })
  test('it throws for unknown unit', ({ expect }) => {
    expect(() => parseAngle('10em')).toThrowError('Cannot parse angle 10em')
  })
  test('it converts units', ({ expect }) => {
    expect(parseAngle('1turn', 'deg', false)).toBe(360)
    expect(parseAngle('360deg', 'grad', false)).toBe(400)
    expect(parseAngle('400grad', 'rad', false)).toBe(Math.PI * 2)
    expect(parseAngle(`${Math.PI * 2}rad`, 'turn', false)).toBe(1)
  })
  test('it mods values', ({ expect }) => {
    expect(parseAngle('360deg', 'inherit', true)).toBe(0)
    expect(parseAngle('400grad', 'inherit', true)).toBe(0)
    expect(parseAngle(`${Math.PI * 2}rad`, 'inherit', true)).toBe(0)
    expect(parseAngle('1turn', 'inherit', true)).toBe(0)
  })
  test('try variant returns error', ({ expect }) => {
    expect(tryParseAngle('10')).toStrictEqual(new Error('Cannot parse angle 10'))
  })
})

describe('parseNumber', () => {
  test('it parses raw integers', ({ expect }) => {
    expect(parseNumber('1')).toBe(1)
  })
  test('it parses positive fractions', ({ expect }) => {
    expect(parseNumber('4.01')).toBe(4.01)
  })
  test('it parses negative fractions', ({ expect }) => {
    expect(parseNumber('-456.8')).toBe(-456.8)
  })
  test('it parses 0', ({ expect }) => {
    expect(parseNumber('0.0')).toBe(0)
  })
  test('it parses positive 0', ({ expect }) => {
    expect(parseNumber('+0.0')).toBe(0)
  })
  test('it parses negative 0', ({ expect }) => {
    expect(parseNumber('-0.0')).toBe(-0)
  })
  test('it parses fractional numbers without leading zero', ({ expect }) => {
    expect(parseNumber('.60')).toBe(0.6)
  })
  test('it parses scientific notation', ({ expect }) => {
    expect(parseNumber('10e3')).toBe(10000)
  })
  test('it parses complex scientific notation', ({ expect }) => {
    expect(parseNumber('-3.4e-2')).toBe(-0.034)
  })
  test('it errors for decimal points not followed by a digit', ({ expect }) => {
    expect(() => parseNumber('12.')).toThrowError('Cannot parse number 12.')
  })
  test('it errors for multiple leading signs', ({ expect }) => {
    expect(() => parseNumber('+-12.2')).toThrowError('Cannot parse number +-12.2')
  })
  test('it errors for multiple decimal points', ({ expect }) => {
    expect(() => parseNumber('12.1.1')).toThrowError('Cannot parse number 12.1.1')
  })
  test('try variant returns error', ({ expect }) => {
    expect(tryParseNumber('10.')).toStrictEqual(new Error('Cannot parse number 10.'))
  })
})

describe('parsePercentage', () => {
  test('it parses percentages', ({ expect }) => {
    expect(parsePercentage('10%')).toBe(10)
  })
  test('it errors for missing % symbol', ({ expect }) => {
    expect(() => parsePercentage('10')).toThrowError('Cannot parse percentage 10')
  })
  test('it can clamp percentages', ({ expect }) => {
    expect(parsePercentage('110%', true)).toBe(100)
    expect(parsePercentage('110%', false)).toBe(110)
  })
  test('it can normalize percentages', ({ expect }) => {
    expect(parsePercentage('50%', true, true)).toBe(0.5)
    expect(parsePercentage('50%', true, false)).toBe(50)
  })
})

describe('parseHexString', () => {
  test('it parses a shorthand hex string', ({ expect }) => {
    expect(parseHexString('#000')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
  })

  test('it parses a expanded hex string', ({ expect }) => {
    expect(parseHexString('#ffffff')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it parses shorthand hex string with alpha', ({ expect }) => {
    expect(parseHexString('#ffff')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it parses expanded hex string with alpha', ({ expect }) => {
    expect(parseHexString('#ffffff00')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 0,
    })
  })

  test('it errors for hex string that is missing the # symbol', ({ expect }) => {
    expect(() => parseHexString('000')).toThrowError('Cannot parse Hex 000')
  })

  test('it errors for hex string that is of an invalid length', ({ expect }) => {
    expect(() => parseHexString('#0')).toThrowError('Cannot parse Hex #0')
    expect(() => parseHexString('#00')).toThrowError('Cannot parse Hex #00')
    expect(() => parseHexString('#00000')).toThrowError('Cannot parse Hex #00000')
    expect(() => parseHexString('#0000000')).toThrowError('Cannot parse Hex #0000000')
    expect(() => parseHexString('#000000000')).toThrowError('Cannot parse Hex #000000000')
  })

  test('it errors for hex string that uses invalid digits', ({ expect }) => {
    expect(() => parseHexString('#ggg')).toThrowError('Cannot parse Hex #ggg')
  })
})

describe('parseRGBString', () => {
  test('it parses an rgb string with numbers', ({ expect }) => {
    expect(parseRGBString('rgb(0 0 0)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
  })

  test('it parses an rgba string with numbers', ({ expect }) => {
    expect(parseRGBString('rgb(0 0 0 / 1)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
  })

  test('it parses an rgba string with numbers and a percentage alpha', ({ expect }) => {
    expect(parseRGBString('rgb(0 0 0 / 50%)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0.5,
    })
  })

  test('it parses an rgb string with percentages', ({ expect }) => {
    expect(parseRGBString(`rgb(50% 50% 50%)`)).toStrictEqual({
      red: 128,
      green: 128,
      blue: 128,
      alpha: 1,
    })
  })

  test('it parses an rgba string with percentages', ({ expect }) => {
    expect(parseRGBString(`rgb(100% 100% 100% / 0.5)`)).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 0.5,
    })
  })

  test('it parses an rgba string with percentages and a percentage alpha', ({ expect }) => {
    expect(parseRGBString(`rgb(100% 100% 100% / 10%)`)).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 0.1,
    })
  })

  test('it parses a legacy rgb string with numbers', ({ expect }) => {
    expect(parseRGBString('rgb(0,0,0)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy rgb string with percentages', ({ expect }) => {
    expect(parseRGBString('rgb(100%, 100%, 100%)')).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    })
  })

  test('it parses a legacy rgba string with numbers', ({ expect }) => {
    expect(parseRGBString('rgba(0, 0, 0, 0.5)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0.5,
    })
  })

  test('it parses a legacy rgba string with numbers and percentage alpha', ({ expect }) => {
    expect(parseRGBString('rgba(0, 0, 0, 25%)')).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0.25,
    })
  })

  test('it parses a legacy rgba string with percentages', ({ expect }) => {
    expect(parseRGBString(`rgba(50%, 50%, 50%, 1)`)).toStrictEqual({
      red: 128,
      green: 128,
      blue: 128,
      alpha: 1,
    })
  })

  test('it parses a legacy rgba string with percentages and percentage alpha', ({ expect }) => {
    expect(parseRGBString(`rgba(0%, 0%, 0%, 100%)`)).toStrictEqual({
      red: 0,
      blue: 0,
      green: 0,
      alpha: 1,
    })
  })

  test('it errors for mixed percentage and number channels', ({ expect }) => {
    expect(() => parseRGBString('rgb(0, 0%, 0)')).toThrowError('Cannot parse RGB rgb(0, 0%, 0)')
  })

  test('it errors for mixed commas and space separator', ({ expect }) => {
    expect(() => parseRGBString('rgb(0 0, 0)')).toThrowError('Cannot parse RGB rgb(0 0, 0)')
  })
})

describe('parseHSLString', () => {
  test('it parses a hsl string with an angle hue', ({ expect }) => {
    expect(parseHSLString('hsl(10deg 0% 0%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a hsl string with an angle hue and a number alpha', ({ expect }) => {
    expect(parseHSLString('hsl(10deg 0% 0% / 1)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a hsl string with an angle hue and a percentage alpha', ({ expect }) => {
    expect(parseHSLString('hsl(10deg 0% 0% / 100%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a hsl string with a number hue', ({ expect }) => {
    expect(parseHSLString('hsl(10 0% 0%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a hsl string with a number hue and a number alpha', ({ expect }) => {
    expect(parseHSLString('hsl(10 0% 0% / 1)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a hsl string with a number hue and a percentage alpha', ({ expect }) => {
    expect(parseHSLString('hsl(10 0% 0% / 100%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsl string with an angle hue', ({ expect }) => {
    expect(parseHSLString('hsl(10deg, 0%, 0%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsl string with a number hue', ({ expect }) => {
    expect(parseHSLString('hsl(10, 0%, 0%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsla string with an angle hue and a number alpha', ({ expect }) => {
    expect(parseHSLString('hsla(10deg, 0%, 0%, 1)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsla string with an angle hue and a percentage alpha', ({ expect }) => {
    expect(parseHSLString('hsla(10deg, 0%, 0%, 100%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsla string with a number hue and a number alpha', ({ expect }) => {
    expect(parseHSLString('hsla(10, 0%, 0%, 1)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })

  test('it parses a legacy hsla string with a number hue and a percentage alpha', ({ expect }) => {
    expect(parseHSLString('hsla(10, 0%, 0%, 100%)')).toStrictEqual({
      hue: 10,
      saturation: 0,
      lightness: 0,
      alpha: 1,
    })
  })
})
