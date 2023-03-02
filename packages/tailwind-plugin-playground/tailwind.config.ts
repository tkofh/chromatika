import type { Config } from 'tailwindcss'
import { createCoreColorPlugins } from '@chromatika/tailwind-plugin'
import { default as chromatikaColors } from '@chromatika/tailwind-palette'

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

console.log(
  createCoreColorPlugins({
    colorPalette: chromatikaColors,
    colorSamplePoints: DefaultColorSamplePoints,
  })
)

console.log({ createCoreColorPlugins })

export default <Partial<Config>>{
  theme: {
    colorScale: DefaultColorSamplePoints,
  },
  plugins: [
    ...createCoreColorPlugins({
      colorPalette: chromatikaColors,
      colorSamplePoints: DefaultColorSamplePoints,
    }),
  ],
}
