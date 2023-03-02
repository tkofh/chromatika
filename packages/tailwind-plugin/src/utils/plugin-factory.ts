import { Color, ColorScale } from '@chromatika/core'
import { PluginCreator } from 'tailwindcss/types/config'
import { DefaultColorSamplePoints } from '.'
import { ColorPalette } from '../types/color-palette'

import { typedEntries } from './entries'

export type CoreColorPluginFactoryParams = {
  classPrefix: string
  valueGetterFactory: (
    params: Exclude<CoreColorPluginFactoryParams, 'valueGetterFactory'> & {
      colorScale: ColorScale
    } & Parameters<PluginCreator>['0']
  ) => (value: unknown) => unknown
}

export const coreColorPluginFactory =
  (pluginParams: CoreColorPluginFactoryParams) =>
  (createPluginParams: {
    colorPalette: ColorPalette
    colorSamplePoints?: Record<string, string | number>
  }) => {
    return (params: Parameters<PluginCreator>['0']) => {
      params.matchUtilities(
        typedEntries(createPluginParams.colorPalette).reduce((acc, [colorName, colorScale]) => {
          const prop = `${pluginParams.classPrefix}-${colorName}`
          if (!(prop in acc)) {
            acc[prop] = pluginParams.valueGetterFactory({ ...pluginParams, colorScale, ...params })
          }
          return acc
        }, {} as Record<string, (value: unknown) => any>),
        { values: createPluginParams.colorSamplePoints ?? DefaultColorSamplePoints }
      )
    }
  }
