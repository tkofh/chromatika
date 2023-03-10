import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'
import { coreColorPluginFactory } from '../utils'

export const createBackgroundColorPlugin = coreColorPluginFactory({
  classPrefix: 'bg',
  valueGetterFactory: (params) => (value) => {
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
  },
})
