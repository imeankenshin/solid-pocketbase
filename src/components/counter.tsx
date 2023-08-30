import { createSignal } from "solid-js"
import "./Counter.css"

const Counter = () => {
  const [count, setCount] = createSignal(0)
  return (
    <button class="increment" onClick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  )
}

export default Counter
