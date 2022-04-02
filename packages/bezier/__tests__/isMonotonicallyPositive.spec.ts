import { describe, test, expect } from 'vitest'
import { isMonotonicallyPositive } from '../src/isMonotonicallyPositive'

describe('isMonotonicallyPositive', () => {
  test('it returns true for a monotonically positive curve', () => {
    expect(isMonotonicallyPositive(0, 0.25, 0.75, 1)).toBe(true)
  })

  test('it returns false for a monotonically negative curve', () => {
    expect(isMonotonicallyPositive(1, 0.75, 0.25, 0)).toBe(false)
  })

  test('it returns false for a curve with a identical start and end points', () => {
    expect(isMonotonicallyPositive(0, 1, 1, 0)).toBe(false)
  })

  test('it returns false for a curve with a local extrema', () => {
    expect(isMonotonicallyPositive(0, 1, 1, 0.1)).toBe(false)
  })

  test('it returns false for a curve with multiple local extrema', () => {
    expect(isMonotonicallyPositive(0, -0.5, 1.5, 1)).toBe(false)
  })
})
