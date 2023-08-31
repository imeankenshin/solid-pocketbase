import { For, JSX, ParentComponent } from "solid-js"
import {
  ZodDefault,
  ZodEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodString,
} from "zod"
import { ZodFormInput } from "./zod-form-input"
import { Dynamic } from "solid-js/web"

type InputTypeBase = ZodEnum<[string, ...string[]]> | ZodString | ZodNumber
type InputTypeWithDefault = ZodDefault<InputTypeBase>
type InputTypeWithNullable = ZodNullable<InputTypeBase>
export type InputType =
  | InputTypeBase
  | InputTypeWithDefault
  | InputTypeWithNullable
  | ZodNullable<InputTypeWithDefault>
  | ZodDefault<InputTypeWithNullable>

type Properties<T extends Record<string, InputType>> = {
  schema: ZodObject<T>
  component?: ParentComponent
  onSubmit?: (context: {
    values: Zod.infer<ZodObject<T>>
    event: Event
  }) => Promise<void>
  option?: Partial<{
    defaultValue: "placeholder" | "first" | "last"
  }>
  style?: JSX.CSSProperties
  class?: string
  children?: JSX.Element
  header?: JSX.Element
  onParseError?: (error: Zod.ZodError) => void
}

/**
 * A form component that uses Zod schema for input validation and parsing.
 * @template T - The type of the schema object.
 */
export function ZodForm<T extends Record<string, InputType>>({
  schema,
  onSubmit,
  children,
  style,
  component,
  class: className,
  header,
  onParseError,
}: Properties<T>) {
  const formReferences: Record<string, HTMLInputElement | HTMLSelectElement> =
    {}

  const submitHandler: JSX.EventHandlerUnion<HTMLFormElement, Event> = async (
    event,
  ) => {
    const formValues: Record<string, string> = {}
    for (const key of Object.keys(formReferences)) {
      formValues[key] = formReferences[key].value
    }

    const parsedValue = await schema.parseAsync(formValues).catch((error) => {
      if (onParseError) {
        onParseError(error)
      }
      throw error
    })

    if (onSubmit) {
      await onSubmit({
        values: parsedValue,
        event,
      })
    }
  }

  return (
    <Dynamic
      component={component || "form"}
      style={style}
      class={className}
      onSubmit={submitHandler}
    >
      {header}
      <For each={Object.keys(schema.shape)}>
        {(key) => {
          const item = schema.shape[key]
          const isZodDefault = item instanceof ZodDefault
          const isZodNullable = item instanceof ZodNullable
          const innerIsZodDefault =
            isZodNullable && item._def.innerType instanceof ZodDefault
          const innerIsisNullable =
            isZodDefault && item._def.innerType instanceof ZodNullable

          return (
            <ZodFormInput
              key={key}
              inputRef={(element) => (formReferences[key] = element)}
              item={
                innerIsZodDefault || innerIsisNullable
                  ? (
                      item._def.innerType as
                        | InputTypeWithDefault
                        | InputTypeWithNullable
                    )._def.innerType
                  : isZodDefault || isZodNullable
                  ? item._def.innerType
                  : item
              }
              defaultValue={
                isZodDefault
                  ? String(item._def.defaultValue())
                  : innerIsZodDefault
                  ? String(
                      (
                        item._def.innerType as InputTypeWithDefault
                      )._def.defaultValue(),
                    )
                  : undefined
              }
            />
          )
        }}
      </For>
      {children}
    </Dynamic>
  )
}

export default ZodForm
