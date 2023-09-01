import { Book, PenTool, Users } from "lucide-solid"
import { A, Title } from "solid-start"

export default function () {
  return (
    <main class="max-w-4xl mx-auto">
      <Title>HomePage</Title>
      <p>
        You are not logged in. <A href="/login">Log in</A> or{" "}
        <A href="/signup">sign up</A> to continue.
      </p>
      <div class="flex gap3 p4 child:w22 child:text-gray-9 child:decoration-none">
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
      <section>
        <h2>Your jornals</h2>
        <ul>
          <li>
            <A href="/jornals/1">Journal 1</A>
          </li>
          <li>
            <A href="/jornals/2">Journal 2</A>
          </li>
        </ul>
      </section>
    </main>
  )
}
