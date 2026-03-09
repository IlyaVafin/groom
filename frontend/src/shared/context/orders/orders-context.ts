import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Order } from "../../types";

export interface OrdersContext {
  orders: Order[] | null
  setOrders: Dispatch<SetStateAction<Order[] | null>>
}

export const OrdersContext = createContext<OrdersContext | null>(null)