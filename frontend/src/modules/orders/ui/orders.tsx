import { Circle } from "lucide-react"
import { useEffect, useState } from "react"
import { useOrdersContext } from "../../../shared/context/orders/useOrdersContext"
import { useUserContext } from "../../../shared/context/user/useUserContext"
import Button from "../../../shared/ui/button/button"
import Heading from "../../../shared/ui/heading/heading"
import { deleteOrderRequest } from "../api/deleteOrderRequest"
import { getOrders } from "../api/getOrders"
import { OrderStatus } from "../types"
import styles from "./orders.module.css"
import { updateOrder } from "../api/updateOrder"
import InputFile from "../../../shared/ui/input-file/input-file"

export default function Orders() {
	const [status, setStatus] = useState("")
	const [currentOrder, setCurrentOrder] = useState("")
	const [apiError, setApiError] = useState("")
	const [file, setFile] = useState<File | undefined>()
	const { orders, setOrders } = useOrdersContext()
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

	async function updateStatus(id: string, status: string) {
		let response
		if (status === OrderStatus.READY) {
			response = await updateOrder(id, status, file)
			if (typeof response === "string") setApiError(response)
		} else {
			response = await updateOrder(id, status)
			if (typeof response === "string") setApiError(response)
		}
		if (typeof response !== "string") {
			setOrders(prev => {
				if (prev) {
					return prev.map(o => (o.id === id ? { ...o, status: status } : o))
				}
				return []
			})
		}
	}
	return (
		<ul className={styles.orderList}>
			{orders &&
				orders.map(order => (
					<li
						className={`${styles.order} ${order.status === OrderStatus.READY ? styles.disabled : ""}`}
						key={order.id}
					>
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
							<>
								<select
									onChange={async e => {
										setApiError("")
										const value = e.target.value
										setStatus(value)
										setCurrentOrder(order.id)
										if (value === "Услуга оказана") return
										await updateStatus(order.id, value)
									}}
									defaultValue={order.status}
									className={styles.orderSelect}
								>
									<option value='Новая'>Новая</option>
									<option value='Обработка данных'>Обработка данных</option>
									<option value='Услуга оказана'>Услуга оказана</option>
								</select>
								{apiError && order.id === currentOrder && <p>{apiError}</p>}
								{status === OrderStatus.READY && order.id === currentOrder && (
									<form
										onSubmit={async e => {
											e.preventDefault()
											await updateStatus(order.id, "Услуга оказана")
										}}
									>
										<InputFile
											id='result-photo'
											onChange={e => setFile(e.target.files?.[0])}
											label={
												<label htmlFor='result-photo'>Загрузить фото</label>
											}
										/>
										<Button className={styles.updateButton} variant='black'>
											Обновить статус
										</Button>
									</form>
								)}
							</>
						)}
						{user?.superuser === false && order.status === OrderStatus.NEW && (
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
