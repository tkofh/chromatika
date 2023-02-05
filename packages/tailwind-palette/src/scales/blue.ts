import { createHSLScale } from '@chromatika/core'

export const blue = createHSLScale({
  hue: [
    { shade: 50, hue: 214 },
    { shade: 100, hue: 214 },
    { shade: 200, hue: 213 },
    { shade: 300, hue: 212 },
    { shade: 400, hue: 213 },
    { shade: 500, hue: 217 },
    { shade: 600, hue: 221 },
    { shade: 700, hue: 224 },
    { shade: 800, hue: 226 },
    { shade: 900, hue: 224 },
  ],
  saturation: [
    { shade: 50, saturation: 100 },
    { shade: 100, saturation: 95 },
    { shade: 200, saturation: 97 },
    { shade: 300, saturation: 96 },
    { shade: 400, saturation: 94 },
    { shade: 500, saturation: 91 },
    { shade: 600, saturation: 83 },
    { shade: 700, saturation: 76 },
    { shade: 800, saturation: 71 },
    { shade: 900, saturation: 64 },
  ],
  lightness: [
    { shade: 50, lightness: 97 },
    { shade: 100, lightness: 93 },
    { shade: 200, lightness: 87 },
    { shade: 300, lightness: 78 },
    { shade: 400, lightness: 68 },
    { shade: 500, lightness: 60 },
    { shade: 600, lightness: 53 },
    { shade: 700, lightness: 48 },
    { shade: 800, lightness: 40 },
    { shade: 900, lightness: 33 },
  ],
})
