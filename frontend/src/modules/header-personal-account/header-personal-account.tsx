import { ArrowLeft } from "lucide-react"
import { NavLink, useNavigate } from "react-router"
import styles from "./header-personal-account.module.css"
import { logoutRequest } from "./api/logout-request"
import Button from "../../shared/ui/button/button"
import { useUserContext } from "../../shared/context/user/useUserContext"
export default function HeaderPersonalAccount() {
	const navigate = useNavigate()
	const { updateUser } = useUserContext()
	async function logout() {
		const response = await logoutRequest()
		if (typeof response !== "string") {
			updateUser(null)
			navigate("/")
		}
	}
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<NavLink className={styles.link} to='/'>
					<ArrowLeft /> Вернуться на главную
				</NavLink>
				<Button onClick={async () => await logout()} className={styles.logout} variant='black'>
					Выйти из аккаунта
				</Button>
			</nav>
		</header>
	)
}
