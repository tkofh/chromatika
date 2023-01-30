import type { RGBA } from '@chromatika/types'
import { convertHSLToRGB } from '../convert'
import { throwResultantErrors } from '../util'
import { tryParseHexString } from './parseHexString'
import { tryParseRGBString } from './parseRGBString'
import { tryParseHSLString } from './parseHSLString'

export const tryParseToRGB = (color: string): RGBA | Error => {
  let result!: RGBA | Error

  const hexResult = tryParseHexString(color)
  if (!(hexResult instanceof Error)) {
    result = hexResult
  }

  if (result === undefined) {
    const rgbResult = tryParseRGBString(color)
    if (!(rgbResult instanceof Error)) {
      result = rgbResult
    }
  }

  if (result === undefined) {
    const hslResult = tryParseHSLString(color)
    if (!(hslResult instanceof Error)) {
      result = convertHSLToRGB(hslResult)
    }
  }

  return result ?? new Error(`Cannot parse color ${color}`)
}

export const parseToRGB = throwResultantErrors(tryParseToRGB)
