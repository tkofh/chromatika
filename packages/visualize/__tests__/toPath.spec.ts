import { describe, test, expect } from 'vitest'
import { createBezierSolver } from '@chromatika/bezier'
import { toPath } from '../src'

describe('toPath', () => {
  test('it produces a path string', () => {
    const path = toPath(
      createBezierSolver([
        [0, 0],
        [0.3, 0],
        [0.2, 0.6],
        [0.5, 0.5],
        [0.8, 0.4],
        [0.7, 1],
        [1, 1],
      ]),
      100,
      { top: 0, left: 0, bottom: 100, right: 100 }
    )

    expect(path.startsWith('M 0 100')).toBe(true)
    expect(path.endsWith('L 100 0')).toBe(true)
  })
})
