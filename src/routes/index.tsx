import { Book, PenTool, Users } from "lucide-solid"
import { A, Title, createRouteData, useRouteData } from "solid-start"
import { getPocketBaseClient } from "~/api/pocketbase"

export function routeData() {
  return createRouteData((_, event) => {
    return { pb: getPocketBaseClient(event) }
  })
}

export default function () {
  const data = useRouteData<typeof routeData>()
  const pb = data()?.pb
  return (
    <main class="max-w-4xl mx-auto">
      <Title>HomePage</Title>
      <h1>
        Hello,{" "}
        {pb?.authStore.isValid ? pb.authStore.model?.username : "new one"}
      </h1>
      <p>
        You are not logged in. <A href="/login">Log in</A> or{" "}
        <A href="/signup">sign up</A> to continue.
      </p>

      <button
        onClick={() => {
          pb?.authStore.clear()
        }}
      >
        Log out
      </button>
      <div class="flex gap2 p4 child:w22 child:text-gray-9 child:decoration-none">
        <A
          href="/journals/new"
          class="p4 bg-white rounded-xl outline-none ring-2 ring-gray-2 hover:ring-blue focus:ring-blue inline-flex gap2 flex-col items-center"
        >
          <PenTool strokeWidth={1.75} />
          <span class="font-medium">Journaling</span>
        </A>
        <A
          href="/jornals"
          class="p4 bg-white rounded-xl outline-none ring-2 ring-gray-2 hover:ring-blue focus:ring-blue inline-flex gap2 flex-col items-center"
        >
          <Book strokeWidth={1.75} />
          <span class="font-medium">History</span>
        </A>

        <A
          href="/partners"
          class="p4 bg-white rounded-xl outline-none ring-2 ring-gray-2 hover:ring-blue focus:ring-blue inline-flex gap2 flex-col items-center"
        >
          <Users strokeWidth={1.75} />
          <span class="font-medium">Partners</span>
        </A>
      </div>
      <h2>Your Goals</h2>
    </main>
  )
}
