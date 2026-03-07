import { Link } from "react-router"
import Container from "../../../shared/ui/container/container"
import styles from "./header.module.css"
import Button from "../../../shared/ui/button/Button"
import { Menu } from "lucide-react"
import Contacts from "./contacts"
import { createPortal } from "react-dom"
import HeaderMobileMenu from "./headerMobileMenu"
import { useState } from "react"
export default function Header() {
	const [show, setShow] = useState(false)
	return (
		<header>
			<Container>
				<div className={styles.headerContainer}>
					<div className={styles.logo}>
						<Link to='/'>
							<img width='170' height='170' src='/svg/logo.svg' alt='логотип' />
						</Link>
						<p>Groomer</p>
					</div>
					<div className={styles.headerInfo}>
						<nav className={styles.headerNav}>
							<ul className={styles.headerList}>
								<li className={styles.headerItem}>
									<Link to='/personal-account'>Личный кабинет</Link>
								</li>
								<li className={styles.headerItem}>
									<Link to='/login'>Войти</Link>
								</li>
								<li className={`${styles.headerItem} ${styles.signUp}`}>
									<Button
										className={`${styles.signUp}`}
										variant='black'
										href='/register'
									>
										Зарегистрироваться
									</Button>
								</li>
							</ul>
						</nav>
						<div className={styles.headerContacts}>
							<div className={styles.line}></div>
							<Contacts />
						</div>
					</div>
					<div className={styles.burgerMenu}>
						<Contacts />
						<Button onClick={() => setShow(true)} variant='icon'>
							<Menu />
						</Button>
					</div>
				</div>
			</Container>
			{createPortal(
				<HeaderMobileMenu show={show} onClose={() => setShow(false)} />,
				document.body,
			)}
		</header>
	)
}
