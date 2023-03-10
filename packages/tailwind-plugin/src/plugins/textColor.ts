import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'
import { coreColorPluginFactory } from '../utils'

export const createTextColorPlugin = coreColorPluginFactory({
  classPrefix: 'text',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    if (!params.corePlugins('textOpacity')) {
      return {
        color: toColorValue(chromatikaColor),
      }
    }
    return withAlphaVariable({
      color: chromatikaColor,
      property: 'color',
      variable: '--tw-text-opacity',
    })
  },
})
