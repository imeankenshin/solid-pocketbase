import { object, string } from "zod"
import ZodForm from "~/components/zod-form"

const loginSchema = object({
  email: string().email(),
  password: string({ description: "password" }).min(8),
})

export default () => {
  return (
    <main class="flex items-center justify-center hscreen wscreen">
      <ZodForm
        class="bg-white max-w-lg rounded-xl wfull m6 flex flex-col gap3 p4 rounded-md shadow-lg"
        schema={loginSchema}
        header={<h1 class="my4">Login</h1>}
      >
        <p>
          If you don't have an account, <a href="/signup">sign up</a> instead.
        </p>
        <button class="py3 px4 rounded-lg border-0" type="submit">
          {true ? "Loading..." : "Login"}
        </button>
      </ZodForm>
    </main>
  )
}
