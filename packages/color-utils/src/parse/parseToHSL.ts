import type { HSLA } from '@chromatika/types'
import { convertRGBToHSL } from '../convert'
import { throwResultantErrors } from '../util'
import { tryParseHexString } from './parseHexString'
import { tryParseRGBString } from './parseRGBString'
import { tryParseHSLString } from './parseHSLString'

export const tryParseToHSL = (color: string): HSLA | Error => {
  let result!: HSLA | Error

  const hexResult = tryParseHexString(color)
  if (!(hexResult instanceof Error)) {
    result = convertRGBToHSL(hexResult)
  }

  if (result === undefined) {
    const rgbResult = tryParseRGBString(color)
    if (!(rgbResult instanceof Error)) {
      result = convertRGBToHSL(rgbResult)
    }
  }

  if (result === undefined) {
    const hslResult = tryParseHSLString(color)
    if (!(hslResult instanceof Error)) {
      result = hslResult
    }
  }

  return result ?? new Error(`Cannot parse color ${color}`)
}

export const parseToHSL = throwResultantErrors(tryParseToHSL)
