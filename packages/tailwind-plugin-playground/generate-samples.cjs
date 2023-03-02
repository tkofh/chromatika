const chromatikaColors = require('@chromatika/tailwind-palette')

const samplePoints = [25, 150, 250, 350, 450, 550, 650, 750, 850]

const bg = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `bg-${color}-[${point}]`
    const textColor = scale.at(point).relativeLuminance > 0.6 ? 'dark' : 'light'
    return `<BackgroundSample class="${classname}" text="${classname}" textColor="${textColor}" />`
  })
  return `<SampleRow title="bg-${color}">${samples.join('')}</SampleRow>`
})

const accent = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `accent-${color}-[${point}]`
    return `<AccentSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="accent-${color}">${samples.join('')}</SampleRow>`
})

const border = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `border-${color}-[${point}]`
    return `<BorderSample class="border-4 border-dashed ${classname}" text="${classname}" />`
  })
  return `<SampleRow title="border-${color}">${samples.join('')}</SampleRow>`
})

const boxShadow = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `shadow-${color}-[${point}]`
    return `<BoxShadowSample class="shadow-lg ${classname}" text="${classname}" />`
  })
  return `<SampleRow title="shadow-${color}">${samples.join('')}</SampleRow>`
})

const caret = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `caret-${color}-[${point}]`
    const bgColor = scale.at(point).relativeLuminance > 0.6 ? 'dark' : 'light'
    return `<CaretSample class="${classname} outline-${color}-[${point}]" text="${classname}" bgColor="${bgColor}" />`
  })
  return `<SampleRow title="caret-${color}">${samples.join('')}</SampleRow>`
})

const divide = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `divide-${color}-[${point}]`
    return `<DivideSample class="${classname} " text="${classname}" />`
  })
  return `<SampleRow title="divide-${color}">${samples.join('')}</SampleRow>`
})

const outline = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `outline-${color}-[${point}]`
    return `<OutlineSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="outline-${color}">${samples.join('')}</SampleRow>`
})

const placeholder = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `placeholder-${color}-[${point}]`
    return `<PlaceholderSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="placeholder-${color}">${samples.join('')}</SampleRow>`
})
const ring = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `ring-${color}-[${point}]`
    return `<RingSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="ring-${color}">${samples.join('')}</SampleRow>`
})
const ringOffset = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `ring-offset-${color}-[${point}]`
    return `<RingOffsetSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="ring-offset-${color}">${samples.join('')}</SampleRow>`
})
const text = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `text-${color}-[${point}]`
    return `<TextSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="text-${color}">${samples.join('')}</SampleRow>`
})
const textDecoration = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `decoration-${color}-[${point}]`
    return `<TextDecorationSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="decoration-${color}">${samples.join('')}</SampleRow>`
})

console.log(textDecoration.flat().join('\n'))
