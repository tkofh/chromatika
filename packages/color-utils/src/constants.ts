export const SHORTHAND_HEX_PATTERN = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i
export const EXPANDED_HEX_PATTERN = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i

export const RGB_PATTERN = /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/i
export const RGBA_PATTERN = /^rgba\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})(?:, ?([01]?.?\d+))?\)$/i
