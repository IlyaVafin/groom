import { Menu } from "lucide-react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router"
import Button from "../../../shared/ui/button/button"
import Contacts from "../../../shared/ui/contacts/contacts"
import Container from "../../../shared/ui/container/container"
import styles from "./header.module.css"
import HeaderMobileMenu from "./header-mobile-menu"
import HeaderModal from "./header-modal"
export default function Header() {
	const [show, setShow] = useState(false)
	const [showModal, setShowModal] = useState(false)
	return (
		<header className={styles.header}>
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
										onClick={() => setShowModal(true)}
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
						<div className={styles.mobileContacts}>
							<Contacts />
						</div>
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
			{showModal && <>{createPortal(<HeaderModal onClose={() => setShowModal(false)}/>, document.body)}</>}
		</header>
	)
}
