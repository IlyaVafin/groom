import { X } from "lucide-react"
import Button from "../../../shared/ui/button/button"
import RegisterForm from "../../../shared/ui/register-form/register-form"
import styles from "./header.module.css"
export default function HeaderModal({onClose}: {onClose: () => void}) {
	return (
		<>
			<div  className={styles.headerFormModal}>
				<RegisterForm prefix="modal" checkboxId="personal-data-header"/>
				<Button onClick={onClose} className={styles.closeForm} variant='icon'>
					<X height={24} width={24} />
				</Button>
			</div>
		</>
	)
}
