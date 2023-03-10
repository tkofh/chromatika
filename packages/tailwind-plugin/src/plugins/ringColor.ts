import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'
import { coreColorPluginFactory } from '../utils'

export const createRingColorPlugin = coreColorPluginFactory({
  classPrefix: 'ring',
  valueGetterFactory: (params) => (value) => {
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
  },
})
