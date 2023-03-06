import toColorValue from 'tailwindcss/lib/util/toColorValue'
import { coreColorPluginFactory } from '../utils'

export const createBoxShadowColorPlugin = coreColorPluginFactory({
  classPrefix: 'shadow',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    return {
      '--tw-shadow-color': toColorValue(chromatikaColor),
      '--tw-shadow': 'var(--tw-shadow-colored)',
    }
  },
})
