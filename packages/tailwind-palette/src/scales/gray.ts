import { createHSLScale } from '@chromatika/core'

export const gray = createHSLScale({
  hue: [
    { shade: 50, hue: 210 },
    { shade: 100, hue: 220 },
    { shade: 200, hue: 220 },
    { shade: 300, hue: 216 },
    { shade: 400, hue: 218 },
    { shade: 500, hue: 220 },
    { shade: 600, hue: 215 },
    { shade: 700, hue: 217 },
    { shade: 800, hue: 215 },
    { shade: 900, hue: 221 },
    { shade: 950, hue: 224 },
  ],
  saturation: [
    { shade: 50, saturation: 20 },
    { shade: 100, saturation: 14 },
    { shade: 200, saturation: 13 },
    { shade: 300, saturation: 12 },
    { shade: 400, saturation: 11 },
    { shade: 500, saturation: 9 },
    { shade: 600, saturation: 14 },
    { shade: 700, saturation: 19 },
    { shade: 800, saturation: 28 },
    { shade: 900, saturation: 39 },
    { shade: 950, saturation: 71 },
  ],
  lightness: [
    { shade: 50, lightness: 98 },
    { shade: 100, lightness: 96 },
    { shade: 200, lightness: 91 },
    { shade: 300, lightness: 84 },
    { shade: 400, lightness: 65 },
    { shade: 500, lightness: 46 },
    { shade: 600, lightness: 34 },
    { shade: 700, lightness: 27 },
    { shade: 800, lightness: 17 },
    { shade: 900, lightness: 11 },
    { shade: 950, lightness: 4 },
  ],
})
export const grey = gray
