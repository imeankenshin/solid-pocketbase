import PocketBase, { Admin, Record as PbRecord } from "pocketbase"
import { JSX, createContext, createSignal, useContext } from "solid-js"

const baseURL = import.meta.env.VITE_POCKETBASE_URL as string

export const pb = new PocketBase(baseURL)

const UserModelContext = createContext<PbRecord | null | Admin>()

export function UserModelProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = createSignal(pb.authStore.model)
  pb.authStore.onChange((token, model) => {
    setUser(model)
  })
  return (
    <UserModelContext.Provider value={user()}>
      {children}
    </UserModelContext.Provider>
  )
}

export function useUserModel() {
  return useContext(UserModelContext)
}
