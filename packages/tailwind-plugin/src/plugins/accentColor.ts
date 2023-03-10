import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createAccentColorPlugin = coreColorPluginFactory({
  classPrefix: 'accent',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      'accent-color': toColorValue(chromatikaColor),
    }
  },
})
