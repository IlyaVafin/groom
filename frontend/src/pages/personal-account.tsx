import { useEffect } from "react"
import HeaderPersonalAccount from "../modules/header-personal-account/header-personal-account"
import OrderForm from "../modules/order-form/order-form"
import Orders from "../modules/orders/ui/orders"
import { useUserContext } from "../shared/context/user/useUserContext"
import { useCheckUser } from "../shared/hooks/useCheckUser"
import styles from "./pages.module.css"
export default function PersonalAccountPage() {
	const { getUser } = useCheckUser()
	const { user } = useUserContext()
	useEffect(() => {
		function voidGetUser() {
			if (!user) {
				getUser()
			}
		}
		voidGetUser()
	}, [getUser, user])

	return (
		<>
			<HeaderPersonalAccount />
			<main>
				<div className={styles.wrapperPersonalAccount}>
					<OrderForm />
					<Orders />
				</div>
			</main>
		</>
	)
}
