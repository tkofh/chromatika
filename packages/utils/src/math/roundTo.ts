export const roundTo = (value: number, precision: number) => {
  if (precision < 1 || Math.round(precision) !== precision) {
    throw new Error('precision must be a positive integer')
  }

  const coefficient = Math.pow(10, precision)

  return Math.round(value * coefficient) / coefficient
}
