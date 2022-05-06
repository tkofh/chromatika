import { Spline, Range } from '@chromatika/types'
import { roundTo } from '@chromatika/math'

export const getSplineThresholds = (
  spline: Spline,
  inputPrecision: number,
  outputPrecision: number
): Range<number>[] => {
  const effectiveOutputPrecision = Math.min(spline.precision, outputPrecision)

  const ranges: Range<number>[] = []

  for (let i = 0; i < spline.extrema.length - 1; i++) {
    const startX = roundTo(spline.extrema[i][0], inputPrecision)
    const startY = roundTo(spline.extrema[i][1], effectiveOutputPrecision)

    const endX = roundTo(spline.extrema[i + 1][0], inputPrecision)
    const endY = roundTo(spline.extrema[i + 1][1], effectiveOutputPrecision)

    const rangeYCount = Math.abs(endY - startY) * Math.pow(10, effectiveOutputPrecision)

    if (rangeYCount === 0) {
      ranges.push({ start: startX, end: endX, value: startY })
    } else {
      const rangeYStep = roundTo((endY - startY) / rangeYCount, effectiveOutputPrecision)
      const rangeYHalfStep = rangeYStep * 0.5

      for (let s = 0; s <= rangeYCount; s++) {
        const currentY = startY + s * rangeYStep

        const rangeStart =
          s === 0
            ? startX
            : roundTo(spline.solveInverse(currentY - rangeYHalfStep, startX, endX)!, inputPrecision)

        const rangeEnd =
          s === rangeYCount
            ? endX
            : roundTo(spline.solveInverse(currentY + rangeYHalfStep, startX, endX)!, inputPrecision)

        if (rangeStart !== rangeEnd) {
          const range: Range<number> = { start: rangeStart, end: rangeEnd, value: currentY }
          ranges.push(range)
        }
      }
    }
  }

  const collapsedRanges: Range<number>[] = []
  for (let i = 0; i < ranges.length; i++) {
    const current = ranges[i]
    if (i === 0) {
      collapsedRanges.push(current)
    } else {
      const previous = ranges[i - 1]

      if (previous.value !== current.value) {
        collapsedRanges.push(current)
      } else {
        previous.end = current.end
      }
    }
  }

  return collapsedRanges
}
