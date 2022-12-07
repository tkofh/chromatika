import { Spline, Point } from '@curvy/types'
import { createCubicBezierSpline } from '@curvy/bezier'
import { getSplineAxisRanges } from '@curvy/spline-utils'
import { ColorScale, ColorRange } from '@chromatika/types'
import { clamp, mod } from 'micro-math'
import { createColorFromHSL } from '@chromatika/color-utils'
import { createColorScale } from './lib'

interface CreateHSLScaleOptions {
  hue: Spline | Array<Point>
  saturation: Spline | Array<Point>
  lightness: Spline | Array<Point>
  precision?: number
}

const DEFAULT_PRECISION = 3

export const createHSLScale = (options: CreateHSLScaleOptions): ColorScale => {
  const precision = options.precision ?? DEFAULT_PRECISION

  const hue = Array.isArray(options.hue)
    ? createCubicBezierSpline(options.hue, { precisionX: precision, precisionY: 0 })
    : options.hue
  const saturation = Array.isArray(options.saturation)
    ? createCubicBezierSpline(options.saturation, { precisionX: precision, precisionY: 0 })
    : options.saturation
  const lightness = Array.isArray(options.lightness)
    ? createCubicBezierSpline(options.lightness, { precisionX: precision, precisionY: 0 })
    : options.lightness

  if (hue.meta.monotonicityX !== 'positive') {
    throw new Error('Hue curve must be monotonically positive on the X axis')
  }
  if (saturation.meta.monotonicityX !== 'positive') {
    throw new Error('Saturation curve must be monotonically positive on the X axis')
  }
  if (lightness.meta.monotonicityX !== 'positive') {
    throw new Error('Lightness curve must be monotonically positive on the X axis')
  }

  if (
    hue.meta.bounds.x.min !== saturation.meta.bounds.x.min ||
    hue.meta.bounds.x.min !== lightness.meta.bounds.x.min ||
    saturation.meta.bounds.x.min !== lightness.meta.bounds.x.min ||
    hue.meta.bounds.x.max !== saturation.meta.bounds.x.max ||
    hue.meta.bounds.x.max !== lightness.meta.bounds.x.max ||
    saturation.meta.bounds.x.max !== lightness.meta.bounds.x.max
  ) {
    throw new Error('Hue, Saturation, and Lightness curves must share X axis start and end values')
  }

  const hueRanges = getSplineAxisRanges(hue, 'Y', 0, precision)
  const saturationRanges = getSplineAxisRanges(saturation, 'Y', 0, precision)
  const lightnessRanges = getSplineAxisRanges(lightness, 'Y', 0, precision)

  const thresholds = new Set<number>()

  for (const range of hueRanges) {
    thresholds.add(range.start)
    range.value = mod(range.value, 0, 360, 'max')
  }
  for (const range of saturationRanges) {
    thresholds.add(range.start)
    range.value = clamp(range.value, 0, 100)
  }
  for (const range of lightnessRanges) {
    thresholds.add(range.start)
    range.value = clamp(range.value, 0, 100)
  }

  const orderedThresholds = Array.from(thresholds).sort((a, b) => a - b)

  let hueIndex = 0
  let saturationIndex = 0
  let lightnessIndex = 0

  const colors: ColorRange[] = []

  for (let i = 0; i < orderedThresholds.length; i++) {
    const isLast = i === orderedThresholds.length - 1

    const start = orderedThresholds[i]
    const end = isLast ? hueRanges[hueRanges.length - 1].end : orderedThresholds[i + 1]

    if (hueRanges[hueIndex].start > start || hueRanges[hueIndex].end <= start) {
      hueIndex++
    }
    if (
      saturationRanges[saturationIndex].start > start ||
      saturationRanges[saturationIndex].end <= start
    ) {
      saturationIndex++
    }
    if (
      lightnessRanges[lightnessIndex].start > start ||
      lightnessRanges[lightnessIndex].end <= start
    ) {
      lightnessIndex++
    }

    const color = createColorFromHSL(
      hueRanges[hueIndex].value,
      saturationRanges[saturationIndex].value,
      lightnessRanges[lightnessIndex].value
    )

    colors.push({
      start,
      startInclusive: true,
      end,
      endInclusive: i === orderedThresholds.length - 1,
      value: color,
    })
  }

  return createColorScale(colors)
}
