import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createOutlineColorPlugin = coreColorPluginFactory({
  classPrefix: 'outline',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        'outline-color': toColorValue(chromatikaColor),
      }
    }
  },
})
