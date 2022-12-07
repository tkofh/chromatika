import { assertInteger } from './assertInteger'
import { assertRange } from './assertRange'

export const assertRGBInput = (red: number, green: number, blue: number, alpha?: number): void => {
  assertInteger(red, 'Red')
  assertRange(red, 'Red', 0, 255)
  assertInteger(green, 'Green')
  assertRange(green, 'green', 0, 255)
  assertInteger(blue, 'Blue')
  assertRange(blue, 'Blue', 0, 255)
  if (alpha != null) {
    assertRange(alpha, 'Alpha', 0, 1)
  }
}
