import { Component, JSX, Show, createEffect, createSignal } from "solid-js"
import styles from "./toggle.module.css"

interface ToggleProperties {
  title?: string
  checked?: boolean
  defaultChecked?: boolean
  id?: string
  ref?: HTMLButtonElement | ((element: HTMLButtonElement) => void)
  onChange?: (value?: boolean) => void
}

const Toggle: Component<ToggleProperties> = (properties) => {
  const [checked, setChecked] = createSignal(properties.defaultChecked)
  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = () => {
    setChecked((previous) => !previous)
  }
  createEffect(() => {
    if (properties.onChange) {
      properties.onChange(checked())
    }
  }, [checked()])

  return (
    <div class={styles["root"]}>
      <Show when={properties.title}>
        <label for={properties.id} class={styles["label"]}>
          {properties.title}
        </label>
      </Show>
      <button
        ref={properties.ref}
        id={properties.id}
        role="switch"
        aria-checked={checked()}
        onClick={onClick}
        class={styles["switch"]}
      >
        <span aria-checked={checked()} aria-hidden class={styles["thumb"]} />
      </button>
    </div>
  )
}

export default Toggle
