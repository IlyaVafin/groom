import Button from "../../shared/ui/button/button"
import Card from "../../shared/ui/card/card"
import Heading from "../../shared/ui/heading/heading"
import Input from "../../shared/ui/input/input"
import styles from "./order-form.module.css"
export default function OrderForm() {
	return (
		<form className={styles.orderForm}>
			<Card className={styles.orderFormCard}>
        <Heading as="h3">Оставьте заявку</Heading>
				<div className={styles.nicknameField}>
					<label htmlFor='nickname'>Кличка</label>
					<Input
						type='text'
						id='nickname'
						variant='white'
						placeholder='Кличка вашего любимца'
					/>
				</div>
				<div className={styles.fileWrapper}>
					<input accept='.jpg, .bmp' type='file' id='photo' />
					<label htmlFor='photo'>
						Фотография <br /> максимум 2МБ
					</label>
				</div>
				<Button className={styles.orderSubmit} variant='black'>Оставить заявку</Button>
			</Card>
		</form>
	)
}
