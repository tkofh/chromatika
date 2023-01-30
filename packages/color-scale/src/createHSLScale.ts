import type { Point, CubicSpline } from '@curvy/types'
import { createCubicCatmullRomSpline } from '@curvy/catmull-rom'
import { clamp, mod, roundTo } from 'micro-math'
import type { ColorRange } from '@chromatika/types'
import { createColorFromHSL } from '@chromatika/color-utils'
import { getSplineRanges } from './lib/getSplineRanges'
import { createColorScale } from './lib'

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
  const hue = Array.isArray(options.hue)
    ? createCubicCatmullRomSpline(
        [options.hue[0], ...options.hue, options.hue[options.hue.length - 1]],
        {
          shade: 4,
          hue: 0,
        }
      )
    : options.hue
  const saturation = Array.isArray(options.saturation)
    ? createCubicCatmullRomSpline(
        [
          options.saturation[0],
          ...options.saturation,
          options.saturation[options.saturation.length - 1],
        ],
        {
          shade: 4,
          saturation: 0,
        }
      )
    : options.saturation
  const lightness = Array.isArray(options.lightness)
    ? createCubicCatmullRomSpline(
        [
          options.lightness[0],
          ...options.lightness,
          options.lightness[options.lightness.length - 1],
        ],
        {
          shade: 4,
          lightness: 0,
        }
      )
    : options.lightness

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
    // lightness.bounds.shade.min !== hue.bounds.shade.min ||
    // lightness.bounds.shade.max !== hue.bounds.shade.max
  ) {
    throw new Error(
      'Hue, Saturation, and Lightness curves must share shade axis start and end dimensions'
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

  while (shade < hue.bounds.shade.max) {
    if (hueRange.end < shade) {
      hueRange = hueRanges.shift()!
    }
    if (saturationRange.end < shade) {
      saturationRange = saturationRanges.shift()!
    }
    if (lightnessRange.end < shade) {
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
