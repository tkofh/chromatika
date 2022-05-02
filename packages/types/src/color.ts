import { Range } from './areas'

export interface Color {
  perceivedBrightness: number

  hsl: string
  hue: number
  saturation: number
  lightness: number

  rgb: string
  red: number
  green: number
  blue: number

  hex: string
}

export interface ColorScale {
  colors: Array<Range<Color>>
  uniqueColor: Set<Color>

  at: (x: number) => Color

  aaBefore: (x: number) => Color | undefined
  aaAfter: (x: number) => Color | undefined
  aaNearest: (x: number) => Color | undefined
  aaaBefore: (x: number) => Color | undefined
  aaaAfter: (x: number) => Color | undefined
  aaaNearest: (x: number) => Color | undefined
}
