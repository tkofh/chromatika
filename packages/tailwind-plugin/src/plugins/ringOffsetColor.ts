import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createRingOffsetColorPlugin = coreColorPluginFactory({
  classPrefix: 'ring-offset',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      '--tw-ring-offset-color': toColorValue(chromatikaColor),
    }
  },
})
