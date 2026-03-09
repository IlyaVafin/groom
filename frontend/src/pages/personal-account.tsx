import { useEffect } from "react"
import { useCheckUser } from "../shared/hooks/useCheckUser"
import Orders from "../modules/orders/ui/orders"
import { useUserContext } from "../shared/context/user/useUserContext"

export default function PersonalAccountPage() {
	const { getUser } = useCheckUser()
	const { user } = useUserContext()
	useEffect(() => {
		if (!user) {
			getUser()
		}
	}, [getUser, user])
	return (
		<main>
			<Orders />
		</main>
	)
}
