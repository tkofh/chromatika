declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette(
    colors: Record<string, string | Record<string, string>>
  ): Record<string, string>
}
declare module 'tailwindcss/lib/util/toColorValue' {
  export default function toColorValue(
    maybeFunction: unknown | ((...args: unknown[]) => unknown)
  ): null | string | string[]
}
declare module 'tailwindcss/lib/util/withAlphaVariable' {
  import type { CSSRuleObject } from 'tailwindcss/types/config'
  export function withAlphaValue(
    color: unknown,
    property: unknown,
    variable: unknown
  ): CSSRuleObject | null

  export default function (params: {
    color: unknown
    property: unknown
    variable: unknown
  }): CSSRuleObject | null
}
