export const assertRange = (input: number, min: number, max: number, label: string): void => {
  if (input < min || input > max) {
    throw new Error(
      `Invalid ${label} input: ${input}. ${label} must be greater than or equal to ${min} and less than or equal to ${max}`
    )
  }
}
