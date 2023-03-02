import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'

export const createBoxShadowColorPlugin = coreColorPluginFactory({
  classPrefix: 'shadow',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      return {
        '--tw-shadow-color': toColorValue(chromatikaColor),
        '--tw-shadow': 'var(--tw-shadow-colored)',
      }
    }
  },
})
