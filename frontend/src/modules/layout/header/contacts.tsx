import styles from './header.module.css'
export default function Contacts() {
	return (
		<div className={styles.contacts}>
			<p className={styles.phone}>+7 904 760 88 90</p>
			<p>Казань, ул. Пушкина 43</p>
		</div>
	)
}
