import { Link } from "react-router"
import styles from "./header.module.css"
import Button from "../../../shared/ui/button/Button"
import Contacts from "./contacts"
import { X } from "lucide-react"
export default function HeaderMobileMenu({ onClose, show }: { onClose: () => void, show: boolean }) {
	return (
		<div className={`${styles.headerModal} ${!show ? styles.hide : styles.show}`}>
			<Button onClick={onClose} className={styles.close} variant='icon'>
				<X />
			</Button>
			<nav>
				<ul className={styles.headerBurgerMenu}>
					<li>
						<Link to='/personal-account'>Личный кабинет</Link>
					</li>
					<li>
						<Link to='/login'>Войти</Link>
					</li>
					<li>
						<Button className={styles.signUp} variant='black' href='/register'>
							Зарегистрироваться
						</Button>
					</li>
				</ul>
			</nav>
			<div className={styles.contactsBurgerMenu}>
				<Contacts />
			</div>
		</div>
	)
}
