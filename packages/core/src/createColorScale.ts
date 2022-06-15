import {
  Color,
  ColorInput,
  ColorScale,
  ColorRange,
  ContrastRatio,
  ScanTarget,
} from '@chromatika/types'
import { warnDev } from '@chromatika/dx'
import { expandHexString, getContrastRatio } from '@chromatika/color-utils'

export const createColorScale = (colors: Array<ColorRange>): ColorScale => {
  const scaleStart = colors[0].start
  const scaleEnd = colors[colors.length - 1].end

  const uniqueColors = new Set<Color>()
  const uniqueHexCodes = new Set<string>()
  for (const range of colors) {
    if (!uniqueHexCodes.has(range.value.hex)) {
      uniqueHexCodes.add(range.value.hex)
      uniqueColors.add(range.value)
    }
  }

  const rangeFor = (
    value: ColorInput | number,
    start = scaleStart,
    end = scaleEnd
  ): ColorRange | undefined => {
    const effectiveStart = Math.max(start, scaleStart)
    const effectiveEnd = Math.min(end, scaleEnd)

    let output: ColorRange | undefined

    if (typeof value === 'number' && (value < effectiveStart || value > effectiveEnd)) {
      warnDev(
        `Input ${value} is outside the ${
          effectiveEnd === scaleEnd && effectiveStart === scaleStart ? "color scale's" : 'input'
        } range of [${effectiveStart}, ${effectiveEnd}]`
      )
    } else {
      for (const range of colors) {
        if (typeof value === 'number') {
          if (
            ((range.startInclusive && value >= range.start) ||
              (!range.startInclusive && value > range.start)) &&
            ((range.endInclusive && value <= range.end) ||
              (!range.endInclusive && value < range.end))
          ) {
            output = range
          }
        } else if (typeof value === 'string') {
          const whitespace = /\s/g
          const compareValue = value.replace(whitespace, '').toLowerCase()
          if (compareValue.startsWith('#')) {
            try {
              if (expandHexString(compareValue) === range.value.hex) {
                output = range
              }
            } catch (e) {}
          } else if (compareValue.startsWith('rgb')) {
            if (range.value.rgb.replace(whitespace, '').toLowerCase() === compareValue) {
              output = range
            }
          } else if (compareValue.startsWith('hsl')) {
            if (range.value.hsl.replace(whitespace, '').toLowerCase() === compareValue) {
              output = range
            }
          }
        } else if ('red' in value) {
          if (
            range.value.red === value.red &&
            range.value.green === value.green &&
            range.value.blue === value.blue
          ) {
            output = range
          }
        } else if ('hue' in value) {
          if (
            range.value.hue === value.hue &&
            range.value.saturation === value.saturation &&
            range.value.lightness === value.lightness
          ) {
            output = range
          }
        }

        if (output !== undefined) {
          break
        }
      }
    }
    return output
  }

  const at = (input: number): Color | undefined => {
    let output: Color | undefined
    if (input < scaleStart || input > scaleEnd) {
      warnDev(
        `Cannot return color at ${input} because scale is undefined outside of [${scaleStart}, ${scaleEnd}]`
      )
    } else {
      output = rangeFor(input)?.value
    }

    return output
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
    uniqueColors,
    rangeFor,
    at,
    has,
    ratioFrom,
  }
}
