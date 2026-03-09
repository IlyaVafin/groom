import { useEffect, useState } from "react"
import type { Order } from "../types"
import { getOrders } from "../api/getOrders"

export default function Orders() {
	const [orders, setOrders] = useState<Order[] | null>(null)
	useEffect(() => {
		async function validateOrders() {
			const response = await getOrders()
			if (typeof response !== "string") {
				setOrders(response)
			}
		}
    validateOrders()
	}, [])
	return (
    <ul>
      {orders && orders.map(order => (
        <li>{order.nickname}</li>
      ))}
    </ul>
  )
}
