import { NUMBER_PATTERN } from '../../constants'
import { throwResultantErrors } from '../../util'

export const tryParseNumber = (number: string): number | Error =>
  NUMBER_PATTERN.test(number) ? parseFloat(number) : new Error(`Cannot parse number ${number}`)

export const parseNumber = throwResultantErrors(tryParseNumber)
