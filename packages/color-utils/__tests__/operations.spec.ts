import { describe, test } from 'vitest'
import { createColorFromHSL, setColorAlpha } from '../src'

describe('setColorAlpha', () => {
  test('it sets the color alpha', ({ expect }) => {
    const HALF_WHITE = setColorAlpha(createColorFromHSL(0, 100, 100), 0.5)
    expect(HALF_WHITE.alpha).toStrictEqual(0.5)
    expect(HALF_WHITE.hsl).toStrictEqual('hsl(0deg 100% 100% / 0.5)')
    expect(HALF_WHITE.rgb).toStrictEqual('rgb(255 255 255 / 0.5)')
    expect(HALF_WHITE.hex).toStrictEqual('#ffffff80')
  })
})
