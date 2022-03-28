export class InvalidBezierError extends Error {
  constructor(message: string) {
    super(`Invalid Bezier Curve: ${message}`)

    Object.defineProperty(this, 'name', { value: 'InvalidBezierError' })
  }
}
