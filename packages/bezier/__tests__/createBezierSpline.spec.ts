import { describe, test, expect } from 'vitest'
// import { toPath } from '@chromatika/visualize'
import { Points } from '@chromatika/shared'
import { createBezierSpline } from '../src'

describe('createBezierSolver', () => {
  test('it throws when an invalid number of points are passed', () => {
    expect(() => createBezierSpline([])).toThrowError('At least one cubic segment must be provided')

    expect(() =>
      createBezierSpline([
        [0, 0],
        [0, 1],
      ])
    ).toThrowError('At least one cubic segment must be provided')

    expect(() =>
      createBezierSpline([
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
      createBezierSpline([
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
    const { solve } = createBezierSpline([
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
    const { solve } = createBezierSpline([
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
      createBezierSpline([
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
      createBezierSpline(
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
    const spline1 = createBezierSpline(
      [
        [0, 0],
        [0, 10],
        [1, -9],
        [1, 1],
      ],
      { precision: 2 }
    )

    expect(spline1.extrema).toStrictEqual([
      [0, 0],
      [0.13, 3.01],
      [0.87, -2.01],
      [1, 1],
    ])

    const spline2 = createBezierSpline([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ])

    expect(spline2.extrema).toStrictEqual([
      [0, 0],
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
    const { extrema } = createBezierSpline(points, { precision: 2 })

    expect(extrema).toStrictEqual([
      [0, 0],
      [0.25, 7.56],
      [0.75, -6.56],
      [1, 1],
    ])
  })
})
