declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette(
    colors: Record<string, string | Record<string, string>>
  ): Record<string, string>
}
declare module 'tailwindcss/lib/util/toColorValue' {
  export default function toColorValue(
    maybeFunction: unknown | ((...args: any[]) => unknown)
  ): unknown
}
declare module 'tailwindcss/lib/util/withAlphaVariable' {
  export function withAlphaValue(color: unknown, property: unknown, variable: unknown): unknown

  export default function (params: {
    color: unknown
    property: unknown
    variable: unknown
  }): unknown
}
