import { Color, ColorInput, ColorRange } from './Color'

export type ContrastRatio = 'aa' | 'aa-large' | 'aaa' | 'aaa-large' | number

export type ScanTarget = 'before' | 'after' | 'nearest' | 'furthest' | 'lightest' | 'darkest'

export interface ColorScale {
  readonly colors: ReadonlyArray<ColorRange>
  readonly uniqueColors: ReadonlySet<Color>

  readonly at: (x: number) => Color

  readonly has: (value: ColorInput | number) => boolean

  readonly rangeFor: (
    value: ColorInput | number,
    start?: number,
    end?: number
  ) => ColorRange | undefined

  readonly ratioFrom: (
    value: ColorInput | number,
    ratio: ContrastRatio,
    scan: ScanTarget,
    start?: number,
    end?: number
  ) => Color | undefined
}
