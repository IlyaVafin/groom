import { Cat } from "lucide-react"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import RegisterForm from "../../shared/ui/register-form/register-form"
import styles from "./form-block.module.css"

export default function FormBlock({ isModal = false }: { isModal?: boolean }) {

	return (
		<section className={styles.formBlock}>
			<Container>
				{!isModal && (
					<Heading className={styles.heading} as='h2'>
						Присоединяйтесь к нам <Cat height={36} width={36} />
					</Heading>
				)}
				<div className={styles.formContent}>
					<RegisterForm/>
				</div>
			</Container>
		</section>
	)
}
