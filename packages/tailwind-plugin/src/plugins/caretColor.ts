import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createCaretColorPlugin = coreColorPluginFactory({
  classPrefix: 'caret',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      'caret-color': toColorValue(chromatikaColor),
    }
  },
})
