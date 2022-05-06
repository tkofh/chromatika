export const assertNormalized = (number: number, label = 'Number') => {
  if (number < 0 || number > 1) {
    throw new Error(
      `Invalid ${label} input: ${number}. ${label} must be greater than or equal to 0 and less than or equal to 1. Did you normalize it?`
    )
  }
}
