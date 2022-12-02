import { assertInteger } from './assertInteger'
import { assertRange } from './assertRange'

export const assertHSLInput = (hue: number, saturation: number, lightness: number, alpha?: number): void => {
  assertInteger(hue, 'Hue')
  assertRange(hue, 0, 359, 'Hue')
  assertRange(saturation, 0, 100, 'Saturation')
  assertRange(lightness, 0, 100, 'Lightness')
  if(alpha != null) {
    assertRange(alpha, 0, 1, 'Alpha')
  }
}
