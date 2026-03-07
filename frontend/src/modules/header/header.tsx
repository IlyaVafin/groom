import Container from "../../shared/ui/container/container"
import styles from "./header.module.css"
export default function Header() {
	return (
		<header>
			<Container>
				<div className={styles.headerContainer}>
					<div className={styles.logo}>
						<img width='170' height='170' src='/svg/logo.svg' alt='логотип' />
					</div>
					<div className={styles.headerInfo}>
						<nav className={styles.headerNav}>
							<ul className={styles.headerList}>
								<li className={styles.headerItem}>
									<a href=''>Личный кабинет</a>
								</li>
								<li className={styles.headerItem}>
									<a href=''>Зарегистрироваться</a>
								</li>
								<li className={styles.headerItem}>
									<a href=''>Войти</a>
								</li>
							</ul>
						</nav>
						<div className={styles.headerContacts}>
							<div className={styles.line}></div>
							<div className=''>
								<p>+7 904 760 88 90</p>
								<p>Казань, ул. Пушкина 43</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</header>
	)
}
