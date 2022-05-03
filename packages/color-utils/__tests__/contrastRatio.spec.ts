import { test, expect } from 'vitest'
import { getContrastRatio, getRelativeLuminance } from '../src'

test('relative luminance', () => {
  expect(getRelativeLuminance(0, 0, 0)).toBe(0)
  expect(getRelativeLuminance(1, 1, 1)).toBe(1)

  expect(getRelativeLuminance(1, 1, 0)).toBeGreaterThan(getRelativeLuminance(1, 0, 1))
})

test('contrast ratio', () => {
  expect(getContrastRatio(getRelativeLuminance(0, 0, 0), getRelativeLuminance(0, 0, 0))).toBe(1)
  expect(getContrastRatio(getRelativeLuminance(0, 0, 0), getRelativeLuminance(1, 1, 1))).toBe(21)
})
