import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'

export const createRingColorPlugin = coreColorPluginFactory({
  classPrefix: 'ring',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      if (!params.corePlugins('ringOpacity')) {
        return {
          '--tw-ring-color': toColorValue(chromatikaColor),
        }
      }
      return withAlphaVariable({
        color: chromatikaColor,
        property: '--tw-ring-color',
        variable: '--tw-ring-opacity',
      })
    }
  },
})
