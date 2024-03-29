import { createHSLScale } from '@chromatika/core'

export const stone = createHSLScale({
  hue: [
    { shade: 50, hue: 60 },
    { shade: 100, hue: 60 },
    { shade: 200, hue: 20 },
    { shade: 300, hue: 24 },
    { shade: 400, hue: 24 },
    { shade: 500, hue: 25 },
    { shade: 600, hue: 33 },
    { shade: 700, hue: 30 },
    { shade: 800, hue: 12 },
    { shade: 900, hue: 24 },
    { shade: 950, hue: 20 },
  ],
  saturation: [
    { shade: 50, saturation: 9 },
    { shade: 100, saturation: 5 },
    { shade: 200, saturation: 6 },
    { shade: 300, saturation: 6 },
    { shade: 400, saturation: 5 },
    { shade: 500, saturation: 5 },
    { shade: 600, saturation: 5 },
    { shade: 700, saturation: 6 },
    { shade: 800, saturation: 6 },
    { shade: 900, saturation: 10 },
    { shade: 950, saturation: 14 },
  ],
  lightness: [
    { shade: 50, lightness: 98 },
    { shade: 100, lightness: 96 },
    { shade: 200, lightness: 90 },
    { shade: 300, lightness: 83 },
    { shade: 400, lightness: 64 },
    { shade: 500, lightness: 45 },
    { shade: 600, lightness: 32 },
    { shade: 700, lightness: 25 },
    { shade: 800, lightness: 15 },
    { shade: 900, lightness: 10 },
    { shade: 950, lightness: 4 },
  ],
})
