import { remap, mod as _mod } from 'micro-math'
import { ANGLE_PATTERN } from '../../constants'
import { throwResultantErrors } from '../../util'

const unitMaxValues = {
  deg: 360,
  grad: 400,
  rad: Math.PI * 2,
  turn: 1,
} as const

type AngleUnit = keyof typeof unitMaxValues

export const tryParseAngle = (
  angle: string,
  unit: AngleUnit | 'inherit' = 'inherit',
  mod = true
): number | Error => {
  let result: number | Error

  const execResult = ANGLE_PATTERN.exec(angle)
  if (execResult === null) {
    result = new Error(`Cannot parse angle ${angle}`)
  } else {
    const unitMax = unitMaxValues[unit === 'inherit' ? (execResult[2] as AngleUnit) : unit]

    result = remap(
      parseFloat(execResult[1]),
      0,
      unitMaxValues[execResult[2] as AngleUnit],
      0,
      unitMax
    )
    if (mod) {
      result = _mod(result, 0, unitMax, 'max')
    }
  }

  return result
}

export const parseAngle = throwResultantErrors(tryParseAngle)
