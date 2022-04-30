export const mod = (value: number, min: number, max: number) => {
  if (min >= max) {
    throw new Error(
      `Cannot mod ${min === max ? 'a range of 0' : 'an inverted range'}, min must be less than max`
    )
  }

  const delta = max - min

  let result = value

  if (result < min) {
    while (result < min) {
      result += delta
    }
  } else if (result > max) {
    result = min + ((result - min) % delta)
  }

  return result
}
