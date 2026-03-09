import { Circle } from "lucide-react"
import { useEffect } from "react"
import { useOrdersContext } from "../../../shared/context/orders/useOrdersContext"
import { useUserContext } from "../../../shared/context/user/useUserContext"
import Button from "../../../shared/ui/button/button"
import Heading from "../../../shared/ui/heading/heading"
import { deleteOrderRequest } from "../api/deleteOrderRequest"
import { getOrders } from "../api/getOrders"
import { OrderStatus } from "../types"
import styles from "./orders.module.css"

export default function Orders() {
  const {orders, setOrders} = useOrdersContext()
	const { user } = useUserContext()
	useEffect(() => {
		async function validateOrders() {
			const response = await getOrders()
			if (typeof response !== "string") {
				setOrders(response)
			}
		}
		validateOrders()
	}, [setOrders])
	async function deleteOrder(id: string) {
		const deletedStatus = await deleteOrderRequest(id)
		if (typeof deletedStatus !== "string") {
			const newOrders = orders?.filter(order => order.id !== id)
			setOrders(newOrders ?? [])
		}
	}
	return (
		<ul className={styles.orderList}>
			{orders &&
				orders.map(order => (
					<li className={`${styles.order}`} key={order.id}>
						<div
							className={order.status === OrderStatus.READY ? styles.ready : ""}
						></div>
						<img
							width='300'
							height='300'
							src={`http://localhost:8000/${order.photo}`}
							alt={order.nickname}
						/>
						<Heading as='h3'>{order.nickname}</Heading>
						<span className={styles.orderStatus}>
							{order.status === OrderStatus.NEW && (
								<Circle width={16} height={16} fill='green' color='green' />
							)}
							{order.status === OrderStatus.PROCESSING && (
								<Circle width={16} height={16} fill='yellow' color='yellow' />
							)}
							{order.status === OrderStatus.READY && (
								<Circle width={16} height={16} fill='gray' color='gray' />
							)}
							{order.status}
						</span>
						{user?.superuser && (
							<select>
								<option value='Обработка данных'>Обработка данных</option>
								<option value='Обработка данных'>Услуга оказана</option>
							</select>
						)}
						{!user?.superuser && order.status === OrderStatus.NEW && (
							<Button
								onClick={async () => await deleteOrder(order.id)}
								className={styles.deleteButton}
								variant='red'
							>
								Удалить
							</Button>
						)}
					</li>
				))}
		</ul>
	)
}
