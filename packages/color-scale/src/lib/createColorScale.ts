import type {
  Color,
  ColorInput,
  ColorScale,
  ColorRange,
  ContrastRatio,
  ScanTarget,
  RGB,
  RGBA,
} from '@chromatika/types'
import { warnDev } from 'log-if-env'
import {
  convertHSLToRGB,
  getContrastRatio,
  parseToRGB,
  setColorAlpha,
} from '@chromatika/color-utils'
import { roundTo } from 'micro-math'

export const createColorScale = (colors: Array<ColorRange>, precision: number): ColorScale => {
  const scaleStart = colors[0].start
  const scaleEnd = colors[colors.length - 1].end

  const uniqueColors = new Map<string, Color>()
  for (const range of colors) {
    if (!uniqueColors.has(range.value.hex)) {
      uniqueColors.set(range.value.hex, range.value)
    }
  }

  const rangeFor = (
    value: ColorInput | number,
    start = scaleStart,
    end = scaleEnd
  ): ColorRange | undefined => {
    const effectiveStart = Math.max(start, scaleStart)
    const effectiveEnd = Math.min(end, scaleEnd)

    let processedValue!: number | RGB
    if (typeof value === 'number') {
      processedValue = roundTo(value, precision)
    } else if (typeof value === 'string') {
      processedValue = parseToRGB(value)
    } else if ('hue' in value) {
      processedValue = convertHSLToRGB(value)
    } else {
      processedValue = value
    }

    if ((value as RGBA).alpha != null && (value as RGBA).alpha !== 1) {
      warnDev('[Chromatika] Setting an alpha value other than 1 for scale.rangeFor() has no effect')
    }

    let output: ColorRange | undefined

    if (typeof value === 'number' && (value < effectiveStart || value > effectiveEnd)) {
      warnDev(
        `Input ${value} is outside the ${
          effectiveEnd === scaleEnd && effectiveStart === scaleStart ? "color scale's" : 'input'
        } range of [${effectiveStart}, ${effectiveEnd}]`
      )
    } else {
      for (const range of colors) {
        if (typeof processedValue === 'number') {
          if (processedValue >= range.start && processedValue <= range.end) {
            output = range
            break
          }
        } else if (
          range.value.red === processedValue.red &&
          range.value.green === processedValue.green &&
          range.value.blue === processedValue.blue
        ) {
          output = range
          break
        }
      }
    }
    return output
  }

  const at = (input: number, alpha?: number): Color => {
    const roundedInput = roundTo(input, precision)
    if (roundedInput < scaleStart || roundedInput > scaleEnd) {
      throw new Error(
        `Cannot return color at ${input} because scale is undefined outside of [${scaleStart}, ${scaleEnd}]`
      )
    } else {
      const color = rangeFor(roundedInput)!.value
      return alpha != null ? setColorAlpha(color, alpha) : color
    }
  }

  const has = (input: ColorInput | number): boolean => rangeFor(input) !== undefined

  const ratioFrom = (
    value: ColorInput | number,
    ratio: ContrastRatio,
    scan: ScanTarget,
    start = scaleStart,
    end = scaleEnd
  ): Color | undefined => {
    const range = rangeFor(value, start, end)

    if (range === undefined) {
      return undefined
    }

    const rangeIndex = colors.indexOf(range)

    let ratioNumber: number
    if (ratio === 'aaa') {
      ratioNumber = 7
    } else if (ratio === 'aaa-large' || ratio === 'aa') {
      ratioNumber = 4.5
    } else if (ratio === 'aa-large') {
      ratioNumber = 3
    } else {
      ratioNumber = ratio
    }

    const searchBefore = scan !== 'after'
    const searchAfter = scan !== 'before'

    let beforeMatch: ColorRange | undefined
    let afterMatch: ColorRange | undefined

    if (searchBefore) {
      for (let i = rangeIndex - 1; i >= 0; i--) {
        const beforeRange = colors[i]
        if (
          getContrastRatio(beforeRange.value.relativeLuminance, range.value.relativeLuminance) >=
          ratioNumber
        ) {
          beforeMatch = beforeRange
          break
        }
      }
    }
    if (searchAfter) {
      for (let i = rangeIndex + 1; i < colors.length; i++) {
        const afterRange = colors[i]
        if (
          getContrastRatio(afterRange.value.relativeLuminance, range.value.relativeLuminance) >=
          ratioNumber
        ) {
          afterMatch = afterRange
          break
        }
      }
    }

    let output: Color | undefined

    if (scan === 'before') {
      output = beforeMatch?.value
    } else if (scan === 'after') {
      output = afterMatch?.value
    } else if (beforeMatch === undefined) {
      output = afterMatch?.value
    } else if (afterMatch === undefined) {
      output = beforeMatch?.value
    } else if (scan === 'lightest') {
      output =
        Math.max(beforeMatch.value.relativeLuminance, afterMatch.value.relativeLuminance) ===
        beforeMatch.value.relativeLuminance
          ? beforeMatch.value
          : afterMatch.value
    } else if (scan === 'darkest') {
      output =
        Math.min(beforeMatch.value.relativeLuminance, afterMatch.value.relativeLuminance) ===
        afterMatch.value.relativeLuminance
          ? afterMatch.value
          : beforeMatch.value
    } else {
      const beforeDist = range.start - beforeMatch.end
      const afterDist = afterMatch.start - range.end

      if (scan === 'nearest') {
        if (beforeDist < afterDist) {
          output = beforeMatch.value
        } else {
          output = afterMatch.value
        }
      } else if (scan === 'furthest') {
        if (beforeDist > afterDist) {
          output = beforeMatch.value
        } else {
          output = afterMatch.value
        }
      }
    }

    return output
  }

  return {
    colors,
    uniqueColors: new Set(uniqueColors.values()),
    rangeFor,
    at,
    has,
    ratioFrom,
  }
}
