import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createAccentColorPlugin = coreColorPluginFactory({
  classPrefix: 'accent',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        'accent-color': toColorValue(chromatikaColor),
      }
    }
  },
})
