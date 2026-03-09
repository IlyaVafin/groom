import { useState, type SubmitEvent } from "react"
import Button from "../../shared/ui/button/button"
import Card from "../../shared/ui/card/card"
import Heading from "../../shared/ui/heading/heading"
import Input from "../../shared/ui/input/input"
import styles from "./order-form.module.css"
import { sendOrder } from "./api/send-order"
import { useOrdersContext } from "../../shared/context/orders/useOrdersContext"
import InputFile from "../../shared/ui/input-file/input-file"
export default function OrderForm() {
	const [nickname, setNickname] = useState("")
	const [photo, setPhoto] = useState<File | undefined>(undefined)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const { setOrders } = useOrdersContext()
	async function submitOrder(e: SubmitEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			setIsSubmitted(true)
			const response = await sendOrder(photo, nickname)
			if (typeof response !== "string") {
				setOrders(prev => {
					if (prev) {
						return [response, ...prev,]
					}
					return [response]
				})
			}
		} finally {
			setIsSubmitted(false)
		}
	}
	return (
		<form onSubmit={submitOrder} className={styles.orderForm}>
			<Card className={styles.orderFormCard}>
				<Heading as='h3'>Оставьте заявку</Heading>
				<div className={styles.nicknameField}>
					<label htmlFor='nickname'>Кличка</label>
					<Input
						value={nickname}
						onChange={e => setNickname(e.target.value)}
						type='text'
						id='nickname'
						variant='white'
						placeholder='Кличка вашего любимца'
					/>
				</div>
				<div className={styles.fileWrapper}>
					<InputFile
						label={
							<label htmlFor='photo'>
								Фотография <br /> максимум 2МБ
							</label>
						}
						onChange={e => setPhoto(e.target.files?.[0])}
						accept='.jpg, .bmp'
						type='file'
						id='photo'
					/>
				</div>
				<Button
					disabled={isSubmitted}
					className={`${styles.orderSubmit} ${isSubmitted ? styles.submitting : ""}`}
					variant='black'
				>
					Оставить заявку
				</Button>
			</Card>
		</form>
	)
}
