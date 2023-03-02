import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createRingOffsetColorPlugin = coreColorPluginFactory({
  classPrefix: 'ring-offset',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        '--tw-ring-offset-color': toColorValue(chromatikaColor),
      }
    }
  },
})
