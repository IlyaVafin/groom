import { useState, type ReactNode } from "react"
import { OrdersContext } from "./orders-context"
import type { Order } from "../../types"

export default function OrdersContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [orders, setOrders] = useState<Order[] | null>(null)
	return (
		<OrdersContext.Provider value={{ orders, setOrders }}>
			{children}
		</OrdersContext.Provider>
	)
}
