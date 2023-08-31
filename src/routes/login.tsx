import { ZodError, object, string } from "zod"
import ZodForm from "~/components/zod-form"
import PocketBase from "pocketbase"
import { createServerAction$, redirect } from "solid-start/server"

const loginSchema = object({
  email: string().email(),
  password: string({ description: "password" }).min(8),
})

export default () => {
  const [action, { Form }] = createServerAction$(
    async (form: FormData, { locals }) => {
      const { email, password } = await loginSchema
        .parseAsync(Object.fromEntries(form))
        .catch((error: ZodError) => {
          throw new Error(error.issues[0].message)
        })

      await (locals.pb as PocketBase)
        .collection("users")
        .authWithPassword(email, password)
      return redirect("/")
    },
  )

  return (
    <main class="flex items-center justify-center hscreen wscreen">
      <ZodForm
        component={Form}
        class="bg-white max-w-lg rounded-xl wfull m6 flex flex-col gap3 p4 rounded-md shadow-lg"
        schema={loginSchema}
        header={<h1 class="my4">Login</h1>}
      >
        <p>
          If you don't have an account, <a href="/signup">sign up</a> instead.
        </p>
        <button
          disabled={action.pending}
          class="py3 px4 rounded-lg border-0"
          type="submit"
        >
          {action.pending ? "Loading..." : "Login"}
        </button>
      </ZodForm>
    </main>
  )
}
