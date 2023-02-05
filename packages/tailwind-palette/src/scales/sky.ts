import { createHSLScale } from '@chromatika/core'

export const sky = createHSLScale({
  hue: [
    { shade: 50, hue: 204 },
    { shade: 100, hue: 204 },
    { shade: 200, hue: 201 },
    { shade: 300, hue: 199 },
    { shade: 400, hue: 198 },
    { shade: 500, hue: 199 },
    { shade: 600, hue: 200 },
    { shade: 700, hue: 201 },
    { shade: 800, hue: 201 },
    { shade: 900, hue: 202 },
  ],
  saturation: [
    { shade: 50, saturation: 100 },
    { shade: 100, saturation: 94 },
    { shade: 200, saturation: 94 },
    { shade: 300, saturation: 95 },
    { shade: 400, saturation: 93 },
    { shade: 500, saturation: 89 },
    { shade: 600, saturation: 98 },
    { shade: 700, saturation: 96 },
    { shade: 800, saturation: 90 },
    { shade: 900, saturation: 80 },
  ],
  lightness: [
    { shade: 50, lightness: 97 },
    { shade: 100, lightness: 94 },
    { shade: 200, lightness: 86 },
    { shade: 300, lightness: 74 },
    { shade: 400, lightness: 60 },
    { shade: 500, lightness: 48 },
    { shade: 600, lightness: 39 },
    { shade: 700, lightness: 32 },
    { shade: 800, lightness: 27 },
    { shade: 900, lightness: 24 },
  ],
})
