import { clamp as _clamp, normalize as _normalize } from 'micro-math'
import { PERCENTAGE_PATTERN } from '../../constants'
import { throwResultantErrors } from '../../util'

export const tryParsePercentage = (
  percentage: string,
  clamp = true,
  normalize = false
): number | Error => {
  let result!: number | Error

  const execResult = PERCENTAGE_PATTERN.exec(percentage)
  if (execResult === null) {
    result = new Error(`Cannot parse percentage ${percentage}`)
  } else {
    result = parseFloat(execResult[1])
    if (clamp) {
      result = _clamp(result, 0, 100)
    }
    if (normalize) {
      result = _normalize(result, 0, 100)
    }
  }

  return result
}

export const parsePercentage = throwResultantErrors(tryParsePercentage)
