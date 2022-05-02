import { Points, Spline, Rect } from '@chromatika/types'
import { remap, roundTo } from '@chromatika/utils'

export const toPath = (spline: Spline, resolution: number, remapTo?: Rect): string => {
  const points: Points = []

  for (let i = 0; i < resolution; i++) {
    const x = remap(i, 0, resolution - 1, spline.boundingBox.minX, spline.boundingBox.maxX)

    points.push([x, spline.solve(x)!])
  }

  const pathCommands: string[] = []

  for (const [index, point] of points.entries()) {
    let pathX!: number
    let pathY!: number
    if (remapTo === undefined) {
      pathX = point[0]
      pathY = roundTo(
        remap(
          point[1],
          spline.boundingBox.minY,
          spline.boundingBox.maxY,
          spline.boundingBox.maxY,
          spline.boundingBox.minY
        ),
        2
      )
    } else {
      pathX = roundTo(
        remap(
          point[0],
          spline.boundingBox.minX,
          spline.boundingBox.maxX,
          remapTo.minX,
          remapTo.maxX
        ),
        2
      )
      pathY = roundTo(
        remap(
          point[1],
          spline.boundingBox.minY,
          spline.boundingBox.maxY,
          remapTo.minY,
          remapTo.maxY
        ),
        2
      )
    }

    pathCommands.push(`${index === 0 ? 'M' : 'L'} ${pathX} ${pathY}`)
  }

  return pathCommands.join(' ')
}
