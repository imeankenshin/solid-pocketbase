import { JSX, Show, For } from "solid-js"
import { ZodString, ZodEnum } from "zod"
import styles from "./zod-form.module.css"
import { InputType } from "./zod-form"

function selectInputType(zodString: ZodString) {
  if (zodString.isEmail) {
    return "email"
  }
  if (zodString.isURL) {
    return "url"
  }
  if (zodString.isDatetime) {
    return "datetime-local"
  }
  if (zodString.isIP) {
    return "ip"
  }
  if (zodString.isUUID) {
    return "uuid"
  }
  if (zodString.description?.includes("password")) {
    return "password"
  }
  return "text"
}

type Properties = {
  key: string
  inputRef?: HTMLElement | ((element: HTMLInputElement) => void)
  item: InputType
  defaultValue?: string
}

export function ZodFormInput({
  key,
  inputRef,
  item,
  defaultValue,
}: Properties) {
  if (item instanceof ZodString) {
    const commonInputProperties: JSX.InputHTMLAttributes<HTMLInputElement> = {
      required: item.isNullable() ? false : true,
      value: defaultValue,
      minLength: item.minLength ?? undefined,
      maxLength: item.maxLength ?? undefined,
      ref: inputRef as HTMLInputElement,
      id: key,
      "aria-describedby": item.description && `${key}-desc`,
      type: selectInputType(item),
      class: "p3 rounded-md border-solid border-gray-300",
    }
    return (
      <div class="flex flex-col wfull gap2">
        <label class="first-letter:uppercase" for={key}>
          {key}
        </label>
        <input {...commonInputProperties} />
        <Show when={item.description}>
          <p id={`${key}-desc`}>{item.description}</p>
        </Show>
      </div>
    )
  }
  if (item instanceof ZodEnum) {
    const options: Array<unknown> = item.options
    if (options.length! > 1) {
      throw new Error("ZodEnum must have at least 2 options")
    }
    if (options.length >= 7) {
      return (
        <div>
          <label class={styles.label} for={key}>
            {key}
          </label>
          <select value={item.options[0]} ref={inputRef as HTMLSelectElement}>
            <For each={options}>
              {(value) => {
                return <option>{String(value)}</option>
              }}
            </For>
          </select>
        </div>
      )
    }
    return (
      <fieldset>
        <legend class={styles.label}>{key}</legend>
        <For each={options}>
          {(value) => {
            return (
              <div>
                <input
                  type="radio"
                  name={key}
                  value={String(value)}
                  ref={inputRef as HTMLInputElement}
                />
                <label>{String(value)}</label>
              </div>
            )
          }}
        </For>
      </fieldset>
    )
  }
  throw new Error("Not implemented")
}
