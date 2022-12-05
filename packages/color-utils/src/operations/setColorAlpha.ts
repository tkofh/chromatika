import { Color } from "@chromatika/types";
import { assertRange } from "../assertions";
import { getHexString, getHSLString, getRGBString } from "../stringify";

export const setColorAlpha = (color: Color, alpha: number) => {
  assertRange(alpha, 0, 1, 'alpha')

  return {
    ...color,
    alpha,
    hsl: getHSLString(color.hue, color.saturation, color.lightness, alpha),
    rgb: getRGBString(color.red, color.green, color.blue, alpha),
    hex: getHexString(color.red, color.green, color.blue, alpha)
  }
}
