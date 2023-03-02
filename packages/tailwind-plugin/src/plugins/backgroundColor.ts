import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'

export const createBackgroundColorPlugin = coreColorPluginFactory({
  classPrefix: 'bg',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      if (!params.corePlugins('backgroundOpacity')) {
        return {
          'background-color': toColorValue(chromatikaColor),
        }
      }
      return withAlphaVariable({
        color: chromatikaColor,
        property: 'background-color',
        variable: '--tw-bg-opacity',
      })
    }
  },
})
