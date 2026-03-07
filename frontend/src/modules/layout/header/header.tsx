import { Link } from "react-router"
import Container from "../../../shared/ui/container/container"
import styles from "./header.module.css"
export default function Header() {
	return (
		<header>
			<Container>
				<div className={styles.headerContainer}>
					<div className={styles.logo}>
						<Link to='/'>
							<img width='170' height='170' src='/svg/logo.svg' alt='логотип' />
						</Link>
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
									<Link to='/register'>Зарегистрироваться</Link>
								</li>
							</ul>
						</nav>
						<div className={styles.headerContacts}>
							<div className={styles.line}></div>
							<div className=''>
								<p className={styles.phone}>+7 904 760 88 90</p>
								<p>Казань, ул. Пушкина 43</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</header>
	)
}
