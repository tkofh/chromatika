import { Range } from './areas'

export interface RGB {
  /**
   * Red component of the RGB form of a color. Normalized (Greater than or equal to 0, less than or equal to 1).
   */
  readonly red: number

  /**
   * Green component of the RGB form of a color. Normalized (Greater than or equal to 0, less than or equal to 1).
   */
  readonly green: number

  /**
   * Blue component of the RGB form of a color. Normalized (Greater than or equal to 0, less than or equal to 1).
   */
  readonly blue: number
}

export interface HSL {
  /**
   * Hue component of the HSL form of a color. Represented in degrees (Greater than or equal to 0, less than to 360).
   */
  readonly hue: number

  /**
   * Saturation component of the HSL form of a color. Normalized (Greater than or equal to 0, less than or equal to 1).
   */
  readonly saturation: number

  /**
   * Lightness component of the HSL form of a color. Normalized (Greater than or equal to 0, less than or equal to 1).
   */
  readonly lightness: number
}

export interface Color extends HSL, RGB {
  readonly perceivedBrightness: number

  readonly hsl: string

  readonly rgb: string

  readonly hex: string
}

export type ColorInput = RGB | HSL | string | number

export type ContrastRatio = 'AA' | 'AAA' | number

export type ScanTarget = 'before' | 'after' | 'nearest' | 'furthest'

export interface ColorScale {
  readonly colors: ReadonlyArray<Range<Color>>
  readonly uniqueColor: ReadonlySet<Color>

  readonly at: (x: number) => Color

  readonly has: (value: ColorInput) => boolean

  readonly rangeFor: (value: ColorInput) => Range<Color> | undefined

  readonly ratioFrom: (
    value: ColorInput,
    ratio: ContrastRatio,
    scan: ScanTarget
  ) => Color | undefined
}
