// @refresh reload
import "@fontsource/inter"
import "@fontsource/inter/"
import "virtual:uno.css"
import "normalize.css"
import "./root.css"
import { Suspense } from "solid-js"
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start"
import { UserModelProvider } from "./api/pocketbase"

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserModelProvider>
        <Body class="bg-zinc-50">
          <A href="/login">Log in</A>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </UserModelProvider>
    </Html>
  )
}
