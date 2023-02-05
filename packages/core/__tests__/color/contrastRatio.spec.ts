import { test } from 'vitest'
import { getContrastRatio, getRelativeLuminance } from '../../src'

test('relative luminance', ({ expect }) => {
  expect(getRelativeLuminance(0, 0, 0)).toBe(0)
  expect(getRelativeLuminance(255, 255, 255)).toBe(1)

  expect(getRelativeLuminance(255, 255, 0)).toBeGreaterThan(getRelativeLuminance(255, 0, 255))
})

test('contrast ratio', ({ expect }) => {
  expect(getContrastRatio(getRelativeLuminance(0, 0, 0), getRelativeLuminance(0, 0, 0))).toBe(1)
  expect(getContrastRatio(getRelativeLuminance(0, 0, 0), getRelativeLuminance(255, 255, 255))).toBe(
    21
  )
})
