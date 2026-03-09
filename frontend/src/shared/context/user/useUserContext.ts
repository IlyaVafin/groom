import { useContext } from "react"
import { UserContext } from "./user-context"

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if(!ctx) throw new Error("User context must be use with provider")
  return ctx
}