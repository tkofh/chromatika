import { describe, test, expect } from 'vitest'
import { toCubicSegments } from '../src'

describe('toCubicSegments', () => {
  test('it errors with no points', () => {
    expect(() => toCubicSegments([])).toThrowError('Invalid Length')
  })

  test('it errors with a point list whose length is less than four', () => {
    expect(() =>
      toCubicSegments([
        [0, 0],
        [0, 0],
      ])
    ).toThrowError('Invalid Length')
  })

  test('it errors with a point list whose length does not match 3n + 1', () => {
    expect(() =>
      toCubicSegments([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ])
    ).toThrowError('Invalid Length')
  })

  test('it returns a single cubic segment', () => {
    expect(
      toCubicSegments([
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ])
    ).toEqual([
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
    ])
  })

  test('it returns multiple cubic segments', () => {
    expect(
      toCubicSegments([
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
      ])
    ).toEqual([
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
      ],
    ])
  })
})
