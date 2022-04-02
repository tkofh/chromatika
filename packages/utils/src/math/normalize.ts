export const normalize = (value: number, start: number, end: number) => {
  if (start - end === 0) {
    throw new Error('Cannot normalize range of 0, range start and end must be different')
  }

  const normalized = (value - start) / (end - start)

  return Object.is(normalized, -0) ? 0 : normalized
}
