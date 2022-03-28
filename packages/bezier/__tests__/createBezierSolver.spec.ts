import { describe, test, expect } from 'vitest'
import { createBezierSolver } from '../src'
import { InvalidBezierError } from '../src/errors'

describe('createBezierSolver', () => {
  test('it throws InvalidBezierError when an invalid number of points are passed', () => {
    expect(() => createBezierSolver([])).toThrowError(
      new InvalidBezierError('Invalid number of points (input must have 3n+1 points)')
    )

    expect(() =>
      createBezierSolver([
        [0, 0],
        [0, 1],
      ])
    ).toThrowError(new InvalidBezierError('Invalid number of points (input must have 3n+1 points)'))

    expect(() =>
      createBezierSolver([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ])
    ).toThrowError(new InvalidBezierError('Invalid number of points (input must have 3n+1 points)'))
  })

  test('it throws InvalidBezierError when a negative-x curve is passed', () => {
    expect(() =>
      createBezierSolver([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ])
    ).toThrowError(
      new InvalidBezierError(
        `Curve Segment ${JSON.stringify([
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ])} fails the vertical line test (more than one y value at a given x)`
      )
    )
  })
})
