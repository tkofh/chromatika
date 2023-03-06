import type { ColorScale } from '@chromatika/core'
import type { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'
import type { ColorPalette } from '../types/colorPalette'

import { typedEntries } from './entries'
import { DefaultColorSamplePoints } from '.'

export interface CoreColorPluginFactoryParams {
  classPrefix: string
  valueGetterFactory: (
    params: Exclude<CoreColorPluginFactoryParams, 'valueGetterFactory'> & {
      colorScale: ColorScale
    } & Parameters<PluginCreator>['0']
  ) => (value: unknown) => CSSRuleObject | null
}

export const coreColorPluginFactory =
  (pluginParams: CoreColorPluginFactoryParams) =>
  (createPluginParams: {
    colorPalette: ColorPalette
    colorSamplePoints?: Record<string, string | number>
  }) =>
  (params: Parameters<PluginCreator>['0']) => {
    params.matchUtilities(
      typedEntries(createPluginParams.colorPalette).reduce((acc, [colorName, colorScale]) => {
        const prop = `${pluginParams.classPrefix}-${colorName}`
        if (!(prop in acc)) {
          acc[prop] = pluginParams.valueGetterFactory({ ...pluginParams, colorScale, ...params })
        }
        return acc
      }, {} as Record<string, (value: unknown) => CSSRuleObject | null>),
      { values: createPluginParams.colorSamplePoints ?? DefaultColorSamplePoints }
    )
  }
