import { coreColorPluginFactory } from '../utils'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable'

export const createDivideColorPlugin = coreColorPluginFactory({
  classPrefix: 'divide',
  valueGetterFactory: (params) => {
    return (value) => {
      const chromatikaColor = params.colorScale.at(Number(value)).hex
      if (!params.corePlugins('divideOpacity')) {
        return {
          ['& > :not([hidden]) ~ :not([hidden])']: {
            'border-color': toColorValue(chromatikaColor),
          },
        }
      }
      return {
        ['& > :not([hidden]) ~ :not([hidden])']: withAlphaVariable({
          color: chromatikaColor,
          property: 'border-color',
          variable: '--tw-divide-opacity',
        }),
      }
    }
  },
})
