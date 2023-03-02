# `@chromatika/tailwind-plugin`

The `@chromatika/tailwind-plugin` allows you to use interpolated color values inferred from a color palette in any standard tailwindcss color classes. Tailwind provides a [default color palette](https://tailwindcss.com/docs/customizing-colors#default-color-palette) with many colors that have increasingly darker shades for the values `50, 100, 200, 300, 400, 500, 600, 700, 800, 900`. `chromatika` has fit these to a curve and we can now get arbitrary color values between the default colors (if you need a `bg-blue-450` or a `text-green-123`, we've got you covered!). 

> To use the colors from the default tailwind palette, use in conjunction with [`@chromatika/tailwind-palette`](https://www.npmjs.com/package/@chromatika/tailwind-palette) as seen in the examples below


## Tailwind Config Usage

`@chromatika/tailwind-plugin` exports replacements for the core tailwind color plugins in order to support arbitrary color stops. To consume these, you can opt into individual plugins or register them all!

### Register Individual Plugins

We export the following tailwind plugins for individual use:
- `createAccentColorPlugin`
- `createBackgroundColorPlugin`
- `createBorderColorPlugin`
- `createBoxShadowColorPlugin`
- `createCaretColorPlugin`
- `createDivideColorPlugin`
- `createOutlineColorPlugin`
- `createPlaceholderColorPlugin`
- `createRingColorPlugin`
- `createRingOffsetColorPlugin`
- `createTextColorPlugin`
- `createTextDecorationColorPlugin`

And you can use them as follows in your tailwind config

```ts
import type { Config } from 'tailwindcss'
import { createBackgroundColorPlugin } from '@chromatika/tailwind-plugin'
import { default as chromatikaColors } from '@chromatika/tailwind-palette'

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  plugins: [
    // only register the background color plugin
    createBackgroundColorPlugin({
      colorPalette: chromatikaColors,
    }),
  ],
}
```

## Register All Plugins

To register all `@chromatika/tailwind-plugin` plugins, use the `createCoreColorPlugins` export

```ts
import type { Config } from 'tailwindcss'
import { createCoreColorPlugins } from '@chromatika/tailwind-plugin'
import { default as chromatikaColors } from '@chromatika/tailwind-palette'

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  plugins: [
    ...createCoreColorPlugins({
      colorPalette: chromatikaColors,
    }),
  ],
}
```

## Other Configuration Options

The above examples make use of [`@chromatika/tailwind-palette`](https://www.npmjs.com/package/@chromatika/tailwind-palette) as the `colorPalette` and the default color sample points defined as follows:

```ts
const DefaultColorSamplePoints = {
  50: 50,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
}
```

We can use any color palettes and color sample points. To create a custom color palette, create a `Record<string, ColorScale>` using `createHSLScale` or `createColorScale` from [`@chromatika/core`](https://www.npmjs.com/package/@chromatika/core). To create custom color sample points, simply create a pojo that satisfies `Record<string, number>`. Any value present in your color sample points will be available without using arbitrary values (if your color sample points includes `123`, you can use `bg-blue-123` rather than `bg-blue-[123]`).

As an example, see the following config that only uses a `blue` color scale and has color stops for all values from `1-900`:

```ts
import type { Config } from 'tailwindcss'
import { createCoreColorPlugins } from '@chromatika/tailwind-plugin'
import { createHSLScale } from '@chromatika/core'

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  plugins: [
    ...createCoreColorPlugins({
      colorPalette: {
        blue: createHSLScale({
          hue: [
            { shade: 50, hue: 214 },
            { shade: 100, hue: 214 },
            { shade: 200, hue: 213 },
            { shade: 300, hue: 212 },
            { shade: 400, hue: 213 },
            { shade: 500, hue: 217 },
            { shade: 600, hue: 221 },
            { shade: 700, hue: 224 },
            { shade: 800, hue: 226 },
            { shade: 900, hue: 224 },
          ],
          saturation: [
            { shade: 50, saturation: 100 },
            { shade: 100, saturation: 95 },
            { shade: 200, saturation: 97 },
            { shade: 300, saturation: 96 },
            { shade: 400, saturation: 94 },
            { shade: 500, saturation: 91 },
            { shade: 600, saturation: 83 },
            { shade: 700, saturation: 76 },
            { shade: 800, saturation: 71 },
            { shade: 900, saturation: 64 },
          ],
          lightness: [
            { shade: 50, lightness: 97 },
            { shade: 100, lightness: 93 },
            { shade: 200, lightness: 87 },
            { shade: 300, lightness: 78 },
            { shade: 400, lightness: 68 },
            { shade: 500, lightness: 60 },
            { shade: 600, lightness: 53 },
            { shade: 700, lightness: 48 },
            { shade: 800, lightness: 40 },
            { shade: 900, lightness: 33 },
          ],
        }),
      },
      colorSamplePoints: Object.fromEntries(
        Array.from({ length: 900 }).map((_, i) => [i + 1, i + 1])
      ),
    }),
  ],
}
```

## Disclaimer: Use With Opacity Plugins

We created plugins that support modification with tailwinds opacity css variables, but our plugins aren't a complete drop-in replacement here. Our plugins take precedence over tailwind's core plugins, so we must give the `important` modifier to any opacity classes (i.e. `class="bg-blue-250 !bg-opacity-50"`). Additionally, the shorthand of `bg-blue-250/50` will not currently work. 

If you need this behavior, you can add these colors to your config. The following snippet will generate add all 900 color stops from `@chromatika/tailwind-palette` to your theme directly rather than inferring them when used (note that generating all colors for your theme may slow down the time to spin up your development server considerably):

```ts
import type { Config } from 'tailwindcss'
import { default as chromatikaColors } from '@chromatika/tailwind-palette'

const colorSamplePoints = Object.fromEntries(
  Array.from({ length: 900 }).map((_, i) => [i + 1, i + 1])
)
const themeFromSamplePoints = Object.fromEntries(
  Object.entries(chromatikaColors).map(([colorKey, colorScale]) => {
    return [
      colorKey,
      Object.fromEntries(
        Object.values(colorSamplePoints).map((value) => [value, colorScale.at(value).hex])
      ),
    ]
  })
)

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: themeFromSamplePoints,
    },
  }
}
```