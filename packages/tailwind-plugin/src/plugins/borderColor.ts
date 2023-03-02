import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'

export const createBorderColorPlugin = coreColorPluginFactory({
  classPrefix: 'border',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      if (!params.corePlugins('borderOpacity')) {
        return {
          'border-color': toColorValue(chromatikaColor),
        }
      }
      return withAlphaVariable({
        color: chromatikaColor,
        property: 'border-color',
        variable: '--tw-border-opacity',
      })
    }
  },
})
