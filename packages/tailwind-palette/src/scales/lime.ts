import { createHSLScale } from '@chromatika/core'

export const lime = createHSLScale({
  hue: [
    { shade: 50, hue: 78 },
    { shade: 100, hue: 80 },
    { shade: 200, hue: 81 },
    { shade: 300, hue: 82 },
    { shade: 400, hue: 83 },
    { shade: 500, hue: 84 },
    { shade: 600, hue: 85 },
    { shade: 700, hue: 86 },
    { shade: 800, hue: 86 },
    { shade: 900, hue: 88 },
  ],
  saturation: [
    { shade: 50, saturation: 92 },
    { shade: 100, saturation: 89 },
    { shade: 200, saturation: 88 },
    { shade: 300, saturation: 85 },
    { shade: 400, saturation: 78 },
    { shade: 500, saturation: 81 },
    { shade: 600, saturation: 85 },
    { shade: 700, saturation: 78 },
    { shade: 800, saturation: 69 },
    { shade: 900, saturation: 61 },
  ],
  lightness: [
    { shade: 50, lightness: 95 },
    { shade: 100, lightness: 89 },
    { shade: 200, lightness: 80 },
    { shade: 300, lightness: 67 },
    { shade: 400, lightness: 55 },
    { shade: 500, lightness: 44 },
    { shade: 600, lightness: 35 },
    { shade: 700, lightness: 27 },
    { shade: 800, lightness: 23 },
    { shade: 900, lightness: 20 },
  ],
})
