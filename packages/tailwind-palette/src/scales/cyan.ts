import { createHSLScale } from '@chromatika/core'

export const cyan = createHSLScale({
  hue: [
    { shade: 50, hue: 183 },
    { shade: 100, hue: 185 },
    { shade: 200, hue: 186 },
    { shade: 300, hue: 187 },
    { shade: 400, hue: 188 },
    { shade: 500, hue: 189 },
    { shade: 600, hue: 192 },
    { shade: 700, hue: 193 },
    { shade: 800, hue: 194 },
    { shade: 900, hue: 196 },
  ],
  saturation: [
    { shade: 50, saturation: 100 },
    { shade: 100, saturation: 96 },
    { shade: 200, saturation: 94 },
    { shade: 300, saturation: 92 },
    { shade: 400, saturation: 86 },
    { shade: 500, saturation: 94 },
    { shade: 600, saturation: 91 },
    { shade: 700, saturation: 82 },
    { shade: 800, saturation: 70 },
    { shade: 900, saturation: 64 },
  ],
  lightness: [
    { shade: 50, lightness: 96 },
    { shade: 100, lightness: 90 },
    { shade: 200, lightness: 82 },
    { shade: 300, lightness: 69 },
    { shade: 400, lightness: 53 },
    { shade: 500, lightness: 43 },
    { shade: 600, lightness: 36 },
    { shade: 700, lightness: 31 },
    { shade: 800, lightness: 27 },
    { shade: 900, lightness: 24 },
  ],
})