// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any[]) => any

export const throwResultantErrors =
  <TOperation extends AnyFunc>(operation: TOperation) =>
  (...args: Parameters<TOperation>): Exclude<ReturnType<TOperation>, Error> => {
    const result = operation(...args)
    if (result instanceof Error) {
      throw result
    }
    return result
  }
