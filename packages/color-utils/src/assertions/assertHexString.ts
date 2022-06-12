import { EXPANDED_HEX_PATTERN, SHORTHAND_HEX_PATTERN } from '../constants'

export const assertHexString = (input: string, label: string) => {
  if (!SHORTHAND_HEX_PATTERN.test(input) && !EXPANDED_HEX_PATTERN.test(input)) {
    throw new Error(
      `Invalid ${label} input ${input}: Please use a valid hex code (including the # at the start)`
    )
  }
}
