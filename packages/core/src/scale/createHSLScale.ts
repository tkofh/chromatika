import type { Point, CubicSpline } from '@curvy/types'
import { createCubicCatmullRomSpline } from '@curvy/catmull-rom'
import { clamp, mod, roundTo, precision } from 'micro-math'
import type { ColorRange } from '../types'
import { createColorFromHSL } from '../color'
import { getSplineRanges } from './getSplineRanges'
import { createColorScale } from './createColorScale'

type HueAxes = 'hue' | 'shade'
type SaturationAxes = 'saturation' | 'shade'
type LightnessAxes = 'lightness' | 'shade'

interface PointListsInput {
  hue: Point<HueAxes>[]
  saturation: Point<SaturationAxes>[]
  lightness: Point<LightnessAxes>[]
}

interface SplinesInput {
  hue: CubicSpline<HueAxes>
  saturation: CubicSpline<SaturationAxes>
  lightness: CubicSpline<LightnessAxes>
}

export type HSLScaleInput = PointListsInput | SplinesInput

export const createHSLScale = (options: HSLScaleInput) => {
  let hue!: CubicSpline<HueAxes>,
    saturation!: CubicSpline<SaturationAxes>,
    lightness!: CubicSpline<LightnessAxes>

  if (Array.isArray(options.hue)) {
    const {
      hue: huePoints,
      saturation: saturationPoints,
      lightness: lightnessPoints,
    } = options as PointListsInput

    const shadePrecision =
      Math.max(
        ...[...huePoints, ...saturationPoints, ...lightnessPoints].map(({ shade }) =>
          precision(shade)
        )
      ) + 1

    hue = createCubicCatmullRomSpline(
      [huePoints[0], ...huePoints, huePoints[huePoints.length - 1]],
      { shade: shadePrecision, hue: 0 }
    )
    saturation = createCubicCatmullRomSpline(
      [saturationPoints[0], ...saturationPoints, saturationPoints[saturationPoints.length - 1]],
      { shade: shadePrecision, saturation: 0 }
    )
    lightness = createCubicCatmullRomSpline(
      [lightnessPoints[0], ...lightnessPoints, lightnessPoints[lightnessPoints.length - 1]],
      { shade: shadePrecision, lightness: 0 }
    )
  } else {
    hue = (options as SplinesInput).hue
    saturation = (options as SplinesInput).saturation
    lightness = (options as SplinesInput).lightness
  }

  if (hue.monotonicity.shade !== 'positive') {
    throw new Error("Hue curve's shade axis must be monotonically positive")
  }
  if (saturation.monotonicity.shade !== 'positive') {
    throw new Error("Saturation curve's shade axis must be monotonically positive")
  }
  if (lightness.monotonicity.shade !== 'positive') {
    throw new Error("Lightness curve's shade axis must be monotonically positive")
  }

  if (
    hue.bounds.shade.min !== saturation.bounds.shade.min ||
    hue.bounds.shade.max !== saturation.bounds.shade.max ||
    saturation.bounds.shade.min !== lightness.bounds.shade.min ||
    saturation.bounds.shade.max !== lightness.bounds.shade.max
  ) {
    throw new Error(
      `Hue, Saturation, and Lightness curves must share shade axis start and end dimensions. Hue: [${hue.bounds.shade.min}, ${hue.bounds.shade.max}], Saturation: [${saturation.bounds.shade.min}, ${saturation.bounds.shade.max}], Lightness: [${lightness.bounds.shade.min}, ${lightness.bounds.shade.max}]`
    )
  }

  if (
    hue.precision.shade !== saturation.precision.shade ||
    saturation.precision.shade !== lightness.precision.shade
  ) {
    throw new Error('Hue, Saturation, and Lightness curves must share shade axis precision')
  }

  const hueRanges = getSplineRanges(hue, 'shade', 'hue')
  const saturationRanges = getSplineRanges(saturation, 'shade', 'saturation')
  const lightnessRanges = getSplineRanges(lightness, 'shade', 'lightness')

  const shadeStep = Math.pow(10, hue.precision.shade * -1)
  let shade = 0
  let hueRange = hueRanges.shift()!
  let saturationRange = saturationRanges.shift()!
  let lightnessRange = lightnessRanges.shift()!

  const colorRanges: ColorRange[] = []

  while (shade <= hue.bounds.shade.max) {
    if (hueRange.end < shade && hueRanges.length > 0) {
      hueRange = hueRanges.shift()!
    }
    if (saturationRange.end < shade && saturationRanges.length > 0) {
      saturationRange = saturationRanges.shift()!
    }
    if (lightnessRange.end < shade && lightnessRanges.length > 0) {
      lightnessRange = lightnessRanges.shift()!
    }

    const nearestEnd = Math.min(hueRange.end, saturationRange.end, lightnessRange.end)

    colorRanges.push({
      value: createColorFromHSL(
        mod(hueRange.value, 0, 360, 'max'),
        clamp(saturationRange.value, 0, 100),
        clamp(lightnessRange.value, 0, 100)
      ),
      start: shade,
      end: nearestEnd,
    })

    shade = roundTo(nearestEnd + shadeStep, hue.precision.shade)
  }

  return createColorScale(colorRanges, hue.precision.shade)
}
