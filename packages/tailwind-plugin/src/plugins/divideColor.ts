import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'
import { coreColorPluginFactory } from '../utils'

export const createDivideColorPlugin = coreColorPluginFactory({
  classPrefix: 'divide',
  valueGetterFactory: (params) => (value) => {
    const chromatikaColor = params.colorScale.at(Number(value)).hex
    if (!params.corePlugins('divideOpacity')) {
      return {
        '& > :not([hidden]) ~ :not([hidden])': {
          'border-color': toColorValue(chromatikaColor),
        },
      }
    }
    return {
      '& > :not([hidden]) ~ :not([hidden])': withAlphaVariable({
        color: chromatikaColor,
        property: 'border-color',
        variable: '--tw-divide-opacity',
      }),
    }
  },
})
