import { useContext } from "react"
import { OrdersContext } from "./orders-context"

export const useOrdersContext = () => {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error("OrdersProvider must be use with provider")
  return ctx
}