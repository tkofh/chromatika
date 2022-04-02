import { Points, Spline, Rect } from '@chromatika/types'
import { remap, roundTo } from '@chromatika/utils'
import { getBoundingBox } from '../utils/getBoundingBox'

export const toPath = (spline: Spline, resolution: number, remapTo?: Rect): string => {
  const points: Points = []

  for (let i = 0; i < resolution; i++) {
    const x = i / (resolution - 1)

    points.push([x, spline.solve(x)])
  }

  const source = getBoundingBox(points)
  const pathCommands: string[] = []

  for (const [index, point] of points.entries()) {
    let pathX!: number
    let pathY!: number
    if (remapTo === undefined) {
      pathX = point[0]
      pathY = roundTo(remap(point[1], source.bottom, source.top, source.top, source.bottom), 2)
    } else {
      pathX = roundTo(remap(point[0], source.left, source.right, remapTo.left, remapTo.right), 2)
      pathY = roundTo(remap(point[1], source.bottom, source.top, remapTo.bottom, remapTo.top), 2)
    }

    pathCommands.push(`${index === 0 ? 'M' : 'L'} ${pathX} ${pathY}`)
  }

  return pathCommands.join(' ')
}
