import type { Config } from 'tailwindcss'
import { createCoreColorPlugins } from '@chromatika/tailwind-plugin'
import chromatikaColors from '@chromatika/tailwind-palette'

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  plugins: [
    ...createCoreColorPlugins({
      colorPalette: chromatikaColors,
    }),
  ],
}
