import { useEffect, useState } from "react"
import type { Order } from "../../shared/types"
import { finishedOrdersRequest } from "./api/finishedOrdersRequest"
import Heading from "../../shared/ui/heading/heading"
import Card from "../../shared/ui/card/card"
import styles from "./finished-orders.module.css"
export default function FinishedOrders() {
	const [orders, setOrders] = useState<Order[]>()
	useEffect(() => {
		async function getFinishedOrders() {
			const response = await finishedOrdersRequest()
			setOrders(response)
		}
		getFinishedOrders()
	}, [])
	return (
		<section>
			<Heading className={styles.heading} as='h2'>Последние выполненые заявки</Heading>
			{orders?.length === 0 && <p>Заявок нет x_x</p>}
			<ul className={styles.finishedList}>
				{orders?.map(o => (
					<li key={o.id}>
						<Card className={styles.orderItem}>
							<img

								width={300}
								height={300}
								src={`http://localhost:8000/${o.photo}`}
                alt={o.nickname}
							/>
							<p>{o.nickname}</p>
						</Card>
					</li>
				))}
			</ul>
		</section>
	)
}
