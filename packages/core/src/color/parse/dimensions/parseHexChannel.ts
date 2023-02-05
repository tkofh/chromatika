import { throwResultantErrors } from '../../util'
import { HEX_CHANNEL_PATTERN } from '../../constants'

export const tryParseHexChannel = (channel: string): number | Error => {
  const execResult = HEX_CHANNEL_PATTERN.exec(channel)
  return execResult === null
    ? new Error(`Cannot parse hex channel ${channel}`)
    : parseInt(execResult[1].length === 1 ? `${execResult[1]}${execResult[1]}` : execResult[1], 16)
}

export const parseHexChannel = throwResultantErrors(tryParseHexChannel)
