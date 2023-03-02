import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createTextDecorationColorPlugin = coreColorPluginFactory({
  classPrefix: 'decoration',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        'text-decoration-color': toColorValue(chromatikaColor),
      }
    }
  },
})
