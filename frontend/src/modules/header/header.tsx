import styles from "./header.module.css"
export default function Header() {
	return (
		<header>
			<div className={styles.headerContainer}>
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
			</div>
		</header>
	)
}
