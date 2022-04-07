import { describe, test, expect } from 'vitest'
import { createBezierSolver } from '@chromatika/bezier'
import { toPath } from '../src'

describe('toPath', () => {
  test('it produces a path string', () => {
    const path = toPath(
      createBezierSolver([
        [10, 20],
        [10.3, 20],
        [10.2, 20.6],
        [10.5, 20.5],
        [10.8, 20.4],
        [10.7, 21],
        [11, 21],
      ]),
      100,
      { top: 0, left: 0, bottom: 100, right: 100 }
    )

    expect(path.startsWith('M 0 100')).toBe(true)
    expect(path.endsWith('L 100 0')).toBe(true)
  })
})
