import PocketBase from "pocketbase"
import { Middleware } from "solid-start/entry-server"
import { FetchEvent } from "solid-start"

const baseURL = import.meta.env.VITE_POCKETBASE_URL as string

export function getPocketBaseClient(event: FetchEvent) {
  return event.locals.pb as PocketBase
}

export const pocketBaseInit: Middleware = ({ forward }) => {
  return async (event) => {
    event.locals.pb = new PocketBase(baseURL)
    const pb = getPocketBaseClient(event)
    const request = event.request
    pb.authStore.loadFromCookie(request.headers.get("cookie") || "")

    try {
      if (pb.authStore.isValid) await pb.collection("users").authRefresh()
    } catch {
      pb.authStore.clear()
    }
    const response = await forward(event)
    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb.authStore.onChange(() => {
      console.log("authStore changed")
      response.headers.set("set-cookie", pb.authStore.exportToCookie())
    })
    return response
  }
}
