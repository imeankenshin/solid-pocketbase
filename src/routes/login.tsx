import { z, object, string } from "zod"
import ZodForm from "~/components/zod-form"
import { useNavigate } from "solid-start"
import { createSignal } from "solid-js"
import PocketBase from "pocketbase"

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL as string)

const loginSchema = object({
  email: string().email(),
  password: string({ description: "password" }).min(8),
})

export default () => {
  const navigate = useNavigate()
  const [loading, setLoading] = createSignal(false)

  const login = async ({ values }: { values: z.infer<typeof loginSchema> }) => {
    setLoading(true)
    try {
      await pb
        .collection("users")
        .authWithPassword(values.email, values.password)
      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <main class="flex items-center justify-center hscreen wscreen">
      <ZodForm
        class="bg-white max-w-lg rounded-xl wfull m6 flex flex-col gap3 p4 rounded-md shadow-lg"
        schema={loginSchema}
        onSubmit={login}
        header={<h1 class="my4">Login</h1>}
      >
        <p>
          If you don't have an account, <a href="/signup">sign up</a> instead.
        </p>
        <button
          disabled={loading()}
          class="py3 px4 rounded-lg border-0"
          type="submit"
        >
          {loading() ? "Loading..." : "Login"}
        </button>
      </ZodForm>
    </main>
  )
}
