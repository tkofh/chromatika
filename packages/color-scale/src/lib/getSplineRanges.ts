import type { BaseAxes, Bounds, CubicSpline } from '@curvy/types'
import { roundTo } from 'micro-math'

export interface AxisRange {
  start: number
  end: number
  value: number
}

export const getSplineRanges = <
  TAxis extends BaseAxes,
  TInputAxis extends TAxis,
  TOutputAxis extends Exclude<TAxis, TInputAxis>
>(
  spline: CubicSpline<TAxis>,
  input: TInputAxis,
  output: TOutputAxis
): AxisRange[] => {
  const allRanges: AxisRange[] = []

  let rangeStart = spline.extrema[0].value[input]

  const constraintAxes = new Set(spline.axes)
  constraintAxes.delete(output)

  for (let i = 0; i < spline.extrema.length - 1; i++) {
    const startExtreme = spline.extrema[i]
    const endExtreme = spline.extrema[i + 1]

    const startOutput = startExtreme.value[output]
    const endOutput = endExtreme.value[output]

    const startInput = startExtreme.value[input]
    const endInput = endExtreme.value[input]

    const constraints = {} as Bounds<TAxis>
    for (const axis of constraintAxes) {
      constraints[axis] = {
        min: Math.min(startExtreme.value[axis], endExtreme.value[axis]),
        max: Math.max(startExtreme.value[axis], endExtreme.value[axis]),
      }
    }

    const outputMagnitude = Math.pow(10, spline.precision[output])
    const outputStep = (startOutput < endOutput ? 1 : -1) / outputMagnitude
    const outputStepCount = Math.abs(endOutput - startOutput) * outputMagnitude

    const inputStep = (startInput < endInput ? 1 : -1) * Math.pow(10, spline.precision[input] * -1)

    for (let i = 0; i <= outputStepCount; i++) {
      const { [output]: value, [input]: rangeEnd } = spline.solve(
        output,
        roundTo(startOutput + outputStep * i, spline.precision[output]),
        constraints
      )

      if (allRanges.length > 0 && allRanges[allRanges.length - 1].value === value) {
        allRanges[allRanges.length - 1].end = rangeEnd
      } else {
        allRanges.push({
          start:
            rangeStart === rangeEnd
              ? rangeStart
              : roundTo(rangeStart + inputStep, spline.precision[input]),
          end: rangeEnd,
          value,
        })
      }
      rangeStart = rangeEnd
    }
  }
  allRanges[allRanges.length - 1].end = spline.extrema[spline.extrema.length - 1].value[input]

  let index = 0
  const indexScalar = 1 / (allRanges.length - 1)

  const ranges: AxisRange[] = []
  while (allRanges.length > 0) {
    const neighbors: AxisRange[] = [allRanges.shift()!]
    while (
      allRanges.length > 0 &&
      allRanges[0].start === neighbors[0].end &&
      allRanges[0].end === neighbors[0].end
    ) {
      neighbors.push(allRanges.shift()!)
    }

    ranges.push({
      start: neighbors[0].start,
      end: neighbors[neighbors.length - 1].end,
      value: neighbors[Math.floor(index * indexScalar * (neighbors.length - 1))].value,
    })
    index += neighbors.length
  }

  return ranges
}
