import type { ColorPalette } from '../types/colorPalette'
import { DefaultColorSamplePoints } from '../utils'
import { createAccentColorPlugin } from './accentColor'
import { createBackgroundColorPlugin } from './backgroundColor'
import { createBorderColorPlugin } from './borderColor'
import { createBoxShadowColorPlugin } from './boxShadowColor'
import { createCaretColorPlugin } from './caretColor'
import { createDivideColorPlugin } from './divideColor'
import { createOutlineColorPlugin } from './outlineColor'
import { createPlaceholderColorPlugin } from './placeholderColor'
import { createRingColorPlugin } from './ringColor'
import { createRingOffsetColorPlugin } from './ringOffsetColor'
import { createTextColorPlugin } from './textColor'
import { createTextDecorationColorPlugin } from './textDecorationColor'

export * from './accentColor'
export * from './backgroundColor'
export * from './borderColor'
export * from './boxShadowColor'
export * from './caretColor'
export * from './divideColor'
export * from './outlineColor'
export * from './placeholderColor'
export * from './ringColor'
export * from './ringOffsetColor'
export * from './textColor'
export * from './textDecorationColor'

export const createCoreColorPlugins = (params: {
  colorPalette: ColorPalette
  colorSamplePoints?: Record<string, string | number>
}) => {
  const pluginParams = {
    colorPalette: params.colorPalette,
    colorSamplePoints: params.colorSamplePoints ?? DefaultColorSamplePoints,
  }
  return [
    createAccentColorPlugin(pluginParams),
    createBackgroundColorPlugin(pluginParams),
    createBorderColorPlugin(pluginParams),
    createBoxShadowColorPlugin(pluginParams),
    createCaretColorPlugin(pluginParams),
    createDivideColorPlugin(pluginParams),
    createOutlineColorPlugin(pluginParams),
    createPlaceholderColorPlugin(pluginParams),
    createRingColorPlugin(pluginParams),
    createRingOffsetColorPlugin(pluginParams),
    createTextColorPlugin(pluginParams),
    createTextDecorationColorPlugin(pluginParams),
  ]
}
