import { Points, toCubicSegments, SplineSolverFactory, unzipCubicPoints } from '@chromatika/shared'
import { isMonotonicallyPositive } from './validation'
import { InvalidBezierError } from './errors'

export const createBezierSolver: SplineSolverFactory = (points: Points) => {
  const segments = toCubicSegments(points)

  if (segments instanceof Error) {
    throw new InvalidBezierError('Invalid number of points (input must have 3n+1 points)')
  }

  for (const segment of segments) {
    const [x] = unzipCubicPoints(segment)
    if (!isMonotonicallyPositive(x)) {
      throw new InvalidBezierError(
        `Curve Segment ${JSON.stringify(
          segment
        )} fails the vertical line test (more than one y value at a given x)`
      )
    }
  }

  return (x) => x
}
