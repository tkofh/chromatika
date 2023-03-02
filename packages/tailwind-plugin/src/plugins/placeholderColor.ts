import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'

export const createPlaceholderColorPlugin = coreColorPluginFactory({
  classPrefix: 'placeholder',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      if (!params.corePlugins('placeholderOpacity')) {
        return {
          '&::placeholder': {
            color: toColorValue(chromatikaColor),
          },
        }
      }
      return {
        '&::placeholder': withAlphaVariable({
          color: chromatikaColor,
          property: 'color',
          variable: '--tw-placeholder-opacity',
        }),
      }
    }
  },
})
