import { describe, test, expect } from 'vitest'
import { createBezierSolver } from '../src'

describe('createBezierSolver', () => {
  test('it throws when an invalid number of points are passed', () => {
    expect(() => createBezierSolver([])).toThrowError('At least one cubic segment must be provided')

    expect(() =>
      createBezierSolver([
        [0, 0],
        [0, 1],
      ])
    ).toThrowError('At least one cubic segment must be provided')

    expect(() =>
      createBezierSolver([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ])
    ).toThrowError('Invalid number of points provided (must have 3n+1 points)')
  })

  test('it throws when a negative-x curve is passed', () => {
    expect(() =>
      createBezierSolver([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ])
    ).toThrowError(
      `Curve ${[
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ].join(', ')} returns more than one y value at some x value`
    )
  })

  test('it produces a curve solver from one segment', () => {
    const { solve } = createBezierSolver([
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ])

    expect(solve(0)).toBe(0)
    expect(solve(1)).toBe(1)
    expect(solve(0.5)).toBe(0.5)
  })

  test('it produces a curve solver from multiple segments', () => {
    const { solve } = createBezierSolver([
      [0, 0],
      [0, 0.5],
      [0.5, 0],
      [0.5, 0.5],
      [0.5, 1],
      [1, 0.5],
      [1, 1],
    ])

    expect(solve(0)).toBe(0)
    expect(solve(0.25)).toBe(0.25)
    expect(solve(0.5)).toBe(0.5)
    expect(solve(0.75)).toBe(0.75)
    expect(solve(1)).toBe(1)
  })
})
