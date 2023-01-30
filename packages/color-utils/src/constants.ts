const numberPartial = '[+-]?\\d*\\.*\\d+(?:e[+-]?\\d*\\.*\\d+)?'
export const NUMBER_PATTERN = new RegExp(`^${numberPartial}$`, 'i')

const angleUnitPartial = `deg|grad|rad|turn`
export const ANGLE_PATTERN = new RegExp(`^(${numberPartial})(${angleUnitPartial})$`, 'i')

export const PERCENTAGE_PATTERN = new RegExp(`^(${numberPartial})%$`, 'i')

export const SHORTHAND_HEX_PATTERN = /^#([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])?$/i
export const EXPANDED_HEX_PATTERN =
  /^#([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})?$/i

export const HEX_CHANNEL_PATTERN = /^([a-fA-F\d]{1,2})$/i

export const RGB_LEGACY_NUMBER_PATTERN = new RegExp(
  `^rgb\\(\\s*(${numberPartial})\\s*,\\s*(${numberPartial})\\s*,\\s*(${numberPartial})\\s*\\)$`,
  'i'
)
export const RGB_LEGACY_PERCENTAGE_PATTERN = new RegExp(
  `^rgb\\(\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*\\)$`,
  'i'
)
export const RGBA_LEGACY_NUMBER_PATTERN = new RegExp(
  `^rgba\\(\\s*(${numberPartial})\\s*,\\s*(${numberPartial})\\s*,\\s*(${numberPartial})\\s*,\\s*(${numberPartial}%?)\\)$`,
  'i'
)
export const RGBA_LEGACY_PERCENTAGE_PATTERN = new RegExp(
  `^rgba\\(\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%?)\\)$`,
  'i'
)
export const RGB_NUMBER_PATTERN = new RegExp(
  `^rgb\\(\\s*(${numberPartial})\\s*(${numberPartial})\\s*(${numberPartial})\\s*(?:/\\s*(${numberPartial}%?))?\\s*\\)$`,
  'i'
)
export const RGB_PERCENTAGE_PATTERN = new RegExp(
  `^rgb\\(\\s*(${numberPartial}%)\\s*(${numberPartial}%)\\s*(${numberPartial}%)\\s*(?:/\\s*(${numberPartial}%?))?\\s*\\)$`,
  'i'
)

export const HSL_LEGACY_PATTERN = new RegExp(
  `^hsl\\(\\s*(${numberPartial}(?:${angleUnitPartial})?)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*\\)`
)
export const HSLA_LEGACY_PATTERN = new RegExp(
  `^hsla\\(\\s*(${numberPartial}(?:${angleUnitPartial})?)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%)\\s*,\\s*(${numberPartial}%?)\\)`
)
export const HSL_PATTERN = new RegExp(
  `^hsl\\(\\s*(${numberPartial}(?:${angleUnitPartial})?)\\s*(${numberPartial}%)\\s*(${numberPartial}%)\\s*(?:/\\s*(${numberPartial}%?))?\\)$`,
  'i'
)
