import { Book, PenTool, Users } from "lucide-solid"
import { Show } from "solid-js"
import { A, Title } from "solid-start"
import { pb } from "~/api/pocketbase"

export default function () {
  return (
    <main class="max-w-4xl mx-auto">
      <Title>Hello World</Title>
      <h1>Hello, user!</h1>
      <Show when={!pb.authStore.isValid}>
        <p>
          You are not logged in. <A href="/login">Log in</A> or{" "}
          <A href="/signup">sign up</A> to continue.
        </p>
      </Show>
      <div class="flex gap2 p4 child:w22 ">
        <div class="p4 bg-white border-solid rounded-xl border-2 border-gray-2 inline-flex gap2 flex-col items-center">
          <PenTool strokeWidth={1.75} />
          <p class="font-medium">Journaling</p>
        </div>
        <div class="p4 bg-white border-solid rounded-xl border-2 border-gray-2 inline-flex gap2 flex-col items-center">
          <Book strokeWidth={1.75} />
          <p class="font-medium">History</p>
        </div>
        <div class="p4 bg-white border-solid rounded-xl border-2 border-gray-2 inline-flex gap2 flex-col items-center">
          <Users strokeWidth={1.75} />
          <p class="font-medium">Partners</p>
        </div>
      </div>
    </main>
  )
}
