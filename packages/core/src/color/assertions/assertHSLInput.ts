import { assertRange } from './assertRange'

export const assertHSLInput = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha?: number
): void => {
  assertRange(hue, 'Hue', 0, 360, 'min')
  assertRange(saturation, 'Saturation', 0, 100)
  assertRange(lightness, 'Lightness', 0, 100)
  if (alpha != null) {
    assertRange(alpha, 'Alpha', 0, 1)
  }
}
