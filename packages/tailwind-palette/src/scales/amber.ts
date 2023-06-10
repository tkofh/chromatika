import { createHSLScale } from '@chromatika/core'

export const amber = createHSLScale({
  hue: [
    { shade: 50, hue: 48 },
    { shade: 100, hue: 48 },
    { shade: 200, hue: 48 },
    { shade: 300, hue: 46 },
    { shade: 400, hue: 43 },
    { shade: 500, hue: 38 },
    { shade: 600, hue: 32 },
    { shade: 700, hue: 26 },
    { shade: 800, hue: 23 },
    { shade: 900, hue: 22 },
    { shade: 950, hue: 21 },
  ],
  saturation: [
    { shade: 50, saturation: 100 },
    { shade: 100, saturation: 96 },
    { shade: 200, saturation: 97 },
    { shade: 300, saturation: 97 },
    { shade: 400, saturation: 96 },
    { shade: 500, saturation: 92 },
    { shade: 600, saturation: 95 },
    { shade: 700, saturation: 90 },
    { shade: 800, saturation: 83 },
    { shade: 900, saturation: 78 },
    { shade: 950, saturation: 92 },
  ],
  lightness: [
    { shade: 50, lightness: 96 },
    { shade: 100, lightness: 89 },
    { shade: 200, lightness: 77 },
    { shade: 300, lightness: 65 },
    { shade: 400, lightness: 56 },
    { shade: 500, lightness: 50 },
    { shade: 600, lightness: 44 },
    { shade: 700, lightness: 37 },
    { shade: 800, lightness: 31 },
    { shade: 900, lightness: 26 },
    { shade: 950, lightness: 14 },
  ],
})
