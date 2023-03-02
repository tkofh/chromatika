import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createCaretColorPlugin = coreColorPluginFactory({
  classPrefix: 'caret',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        'caret-color': toColorValue(chromatikaColor),
      }
    }
  },
})
