import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server"
import { pocketBaseInit } from "./api/pocketbase"

export default createHandler(
  pocketBaseInit,
  renderAsync((event) => <StartServer event={event} />),
)
