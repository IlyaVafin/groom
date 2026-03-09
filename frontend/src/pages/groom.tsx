import { useNavigate } from "react-router"
import HeaderPersonalAccount from "../modules/header-personal-account/header-personal-account"
import { useUserContext } from "../shared/context/user/useUserContext"
import { useCheckUser } from "../shared/hooks/useCheckUser"
import { useEffect } from "react"
import Orders from "../modules/orders/ui/orders"
import styles from './pages.module.css'
export default function GroomPage() {
	const { user } = useUserContext()
	const { getUser } = useCheckUser()
	const navigate = useNavigate()
	useEffect(() => {
		getUser()
	}, [getUser])
  if(!user) return <p>loading...</p>
	if (user.superuser === false) navigate("/")
	return (
		<>
			<HeaderPersonalAccount />
			<main className={styles.groomMain}>
				<Orders />
			</main>
		</>
	)
}
