import { describe, test } from 'vitest'
import { createHSLScale } from '../src'

describe('createHSLScale', () => {
  test('it works', ({ expect }) => {
    expect(2).toBe(2)

    createHSLScale({
      hue: [
        { shade: 0, hue: 0 },
        { shade: 0.25, hue: 50 },
        { shade: 0.5, hue: 25 },
        { shade: 0.75, hue: 100 },
        { shade: 1, hue: 75 },
      ],
      saturation: [
        { shade: 0, saturation: 0 },
        { shade: 1, saturation: 100 },
      ],
      lightness: [
        { shade: 0, lightness: 0 },
        { shade: 1, lightness: 100 },
      ],
    })
  })
})
