export interface Rect {
  maxY: number
  maxX: number
  minY: number
  minX: number
}

export interface Range<T> {
  start: number
  end: number
  value: T
}
