import { getSplineThresholds, mod, clamp } from '@chromatika/utils'
import { Spline, Range } from '@chromatika/types'

interface CreateHSLScaleOptions {
  hue: Spline
  saturation: Spline
  lightness: Spline
  precision?: number
}

const DEFAULT_PRECISION = 3

export const createHSLScale = (options: CreateHSLScaleOptions) => {
  const precision = options.precision ?? DEFAULT_PRECISION

  const hueThresholds = getSplineThresholds(options.hue, precision, 0)
  const saturationThresholds = getSplineThresholds(options.saturation, precision, 0)
  const lightnessThresholds = getSplineThresholds(options.lightness, precision, 0)

  /**
   * 0 and 1 will always be a part of thresholds
   * this is because the start and end points of a curve are considered extrema,
   * and we force the start and end x values to be 0 and 1
   */
  const rangeBoundaries = new Set<number>()

  for (const threshold of hueThresholds) {
    rangeBoundaries.add(threshold.start)
    rangeBoundaries.add(threshold.end)

    threshold.value = mod(threshold.value, 0, 360)
  }

  for (const threshold of saturationThresholds) {
    rangeBoundaries.add(threshold.start)
    rangeBoundaries.add(threshold.end)

    threshold.value = clamp(threshold.value, 0, 100)
  }

  for (const threshold of lightnessThresholds) {
    rangeBoundaries.add(threshold.start)
    rangeBoundaries.add(threshold.end)

    threshold.value = clamp(threshold.value, 0, 100)
  }

  const orderedRangeBoundaries = Array.from(rangeBoundaries).sort((a: number, b: number) => a - b)

  let hueThresholdIndex = 0
  let saturationThresholdIndex = 0
  let lightnessThresholdIndex = 0

  const colors: Range<string>[] = []
  const uniqueColors: Set<string> = new Set()

  for (let i = 1; i < orderedRangeBoundaries.length - 1; i++) {
    const threshold = orderedRangeBoundaries[i]

    while (hueThresholds[hueThresholdIndex].end < threshold) {
      hueThresholdIndex++
    }

    while (saturationThresholds[saturationThresholdIndex].end < threshold) {
      saturationThresholdIndex++
    }

    while (lightnessThresholds[lightnessThresholdIndex].end < threshold) {
      lightnessThresholdIndex++
    }

    const hueThreshold = hueThresholds[hueThresholdIndex]
    const saturationThreshold = saturationThresholds[saturationThresholdIndex]
    const lightnessThreshold = lightnessThresholds[lightnessThresholdIndex]

    const color = `hsl(${hueThreshold.value}deg ${saturationThreshold.value}% ${lightnessThreshold.value}%)`

    uniqueColors.add(color)

    colors.push({
      start: Math.max(hueThreshold.start, saturationThreshold.start, lightnessThreshold.start),
      end: threshold,
      value: color,
    })
  }

  // const resultCache = new Map<number, string>()
  //
  // return (x: number): string => {
  //   let input = roundTo(x, precision)
  //
  //   let output!: string
  //
  //   if (resultCache.has(input)) {
  //     output = resultCache.get(input)!
  //   } else {
  //     if (input < 0) {
  //       if (!IS_PROD) {
  //         console.warn(`Clamping input ${input} to 0 as colors are undefined below this value.`)
  //       }
  //       input = 0
  //     }
  //
  //     if (input > 1) {
  //       if (!IS_PROD) {
  //         console.warn(`Clamping input ${input} to 1 as colors are undefined above this value.`)
  //       }
  //       input = 1
  //     }
  //
  //     if (input === 1) {
  //       output = colors[colors.length - 1][1]
  //     } else {
  //       for (let i = 0; i < colors.length; i++) {
  //         const [[rangeStart, rangeEnd], color] = colors[i]
  //         if (input >= rangeStart && input < rangeEnd) {
  //           output = color
  //           break
  //         }
  //       }
  //     }
  //   }
  //
  //   resultCache.set(input, output)
  //
  //   return output
  // }
}
