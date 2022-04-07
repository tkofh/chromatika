import { describe, test, expect } from 'vitest'
// import { toPath } from '@chromatika/visualize'
import { Points } from '@chromatika/shared'
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

  test('it calculates the bounding box', () => {
    expect(
      createBezierSolver([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]).boundingBox
    ).toStrictEqual({
      top: 1,
      left: 0,
      right: 1,
      bottom: 0,
    })

    expect(
      createBezierSolver(
        [
          [0, 0],
          [0, 10],
          [1, -9],
          [1, 1],
        ],
        { precision: 1 }
      ).boundingBox
    ).toStrictEqual({ top: 3, left: 0, bottom: -2, right: 1 })
  })

  test('it calculates the extrema of one segment', () => {
    const points: Points = [
      [0, 0],
      [0, 10],
      [1, -9],
      [1, 1],
    ]
    const { extrema } = createBezierSolver(points, { precision: 2 })

    expect(extrema).toStrictEqual([
      [0, 0],
      [0.13, 3.01],
      [0.87, -2.01],
      [1, 1],
    ])
  })

  test('it calculates the extrema of many segments', () => {
    const points: Points = [
      [0, 0],
      [0, 10],
      [0.5, 10],
      [0.5, 0.5],
      [0.5, -9],
      [1, -9],
      [1, 1],
    ]
    const { extrema } = createBezierSolver(points, { precision: 2 })

    expect(extrema).toStrictEqual([
      [0, 0],
      [0.25, 7.56],
      [0.75, -6.56],
      [1, 1],
    ])

    // expect(extrema).toHaveLength(4)
    // expect(extrema[0]).toStrictEqual(points[0])
    // expect(extrema[1]).toStrictEqual([0.13, 3.01])
    // expect(extrema[2]).toStrictEqual([0.87, -2.01])
    // expect(extrema[3]).toStrictEqual(points[3])
  })
})
