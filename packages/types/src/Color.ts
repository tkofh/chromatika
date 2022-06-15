export interface RGB {
  /**
   * Red component of the RGB form of a color
   */
  readonly red: number

  /**
   * Green component of the RGB form of a color
   */
  readonly green: number

  /**
   * Blue component of the RGB form of a color
   */
  readonly blue: number
}

export interface HSL {
  /**
   * Hue component of the HSL form of a color. Represented in degrees (Greater than or equal to 0, less than to 360).
   */
  readonly hue: number

  /**
   * Saturation component of the HSL form of a color
   */
  readonly saturation: number

  /**
   * Lightness component of the HSL form of a color
   */
  readonly lightness: number
}

export interface Color extends HSL, RGB {
  readonly relativeLuminance: number

  /**
   * CSS Color String in HSL form
   */
  readonly hsl: string

  /**
   * CSS Color String in RGB form
   */
  readonly rgb: string

  /**
   * CSS Color String in Hex Code form
   */
  readonly hex: string
}

export type ColorInput = RGB | HSL | string

export interface ColorRange {
  start: number
  startInclusive: boolean
  end: number
  endInclusive: boolean
  value: Color
}
