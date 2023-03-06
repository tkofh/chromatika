import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createOutlineColorPlugin = coreColorPluginFactory({
  classPrefix: 'outline',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      'outline-color': toColorValue(chromatikaColor),
    }
  },
})
