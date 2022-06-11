export const assertInteger = (input: number, label: string) => {
  if (Math.round(input) !== input) {
    throw new Error(`Invalid ${label} input: ${input}. ${label} must be an integer`)
  }
}
