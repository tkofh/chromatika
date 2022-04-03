import { Points, Rect } from '@chromatika/shared'

export const getBoundingBox = (points: Points): Rect => {
  if (points.length === 0) {
    throw new Error('Cannot compute bounding box for empty set of points')
  }

  const box: Rect = {
    top: points[0][1],
    bottom: points[0][1],
    right: points[0][0],
    left: points[0][0],
  }

  for (const [x, y] of points.slice(1)) {
    box.top = Math.max(box.top, y)
    box.bottom = Math.min(box.bottom, y)
    box.right = Math.max(box.right, x)
    box.left = Math.min(box.left, x)
  }

  return box
}
