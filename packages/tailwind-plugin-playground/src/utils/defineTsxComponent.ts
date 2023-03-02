import { SetupContext } from 'nuxt/dist/app/compat/capi'
type Prepend<T, U extends any[]> = [T, ...U]
type Keys<T extends Record<string, any>> = Keys_<T, []>
type Keys_<T extends Record<string, any>, U extends PropertyKey[]> = {
  [P in keyof T]: {} extends Omit<T, P> ? [P] : Prepend<P, Keys_<Omit<T, P>, U>>
}[keyof T]

export const defineTsxComponent = <Props extends Readonly<{ [x: string]: any }>>(
  props: Keys<Props> | Props,
  render: (props: Props, ctx: SetupContext) => JSX.Element
) => {
  return defineComponent({
    props: Array.isArray(props) ? (props as string[]) : Object.keys(props),
    setup(props, ctx) {
      return () => render(props as any, ctx)
    },
  })
}

export const TsxProp = undefined as any
