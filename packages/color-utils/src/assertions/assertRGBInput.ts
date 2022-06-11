import { assertInteger } from './assertInteger'
import { assertRange } from './assertRange'

export const assertRGBInput = (red: number, green: number, blue: number): void => {
  assertInteger(red, 'Red')
  assertRange(red, 0, 255, 'Red')
  assertInteger(green, 'Green')
  assertRange(green, 0, 255, 'Green')
  assertInteger(blue, 'Blue')
  assertRange(blue, 0, 255, 'Blue')
}
