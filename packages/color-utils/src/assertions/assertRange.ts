export const assertRange = (
  input: number,
  label: string,
  min: number,
  max: number,
  inclusivity: 'min' | 'max' | 'both' | 'none' = 'both'
): void => {
  const minInclusive = inclusivity === 'min' || inclusivity === 'both'
  const maxInclusive = inclusivity === 'max' || inclusivity === 'both'

  if ((minInclusive ? input < min : input <= min) || (maxInclusive ? input > max : input >= max)) {
    throw new Error(
      `Invalid ${label} input: ${input}. ${label} must be greater than ${
        minInclusive ? 'or equal to ' : ''
      }${min} and less than ${maxInclusive ? 'or equal to ' : ''}${max}`
    )
  }
}
