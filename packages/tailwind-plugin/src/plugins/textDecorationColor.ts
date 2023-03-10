import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createTextDecorationColorPlugin = coreColorPluginFactory({
  classPrefix: 'decoration',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      'text-decoration-color': toColorValue(chromatikaColor),
    }
  },
})
