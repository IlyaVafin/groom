import { useEffect } from "react"
import { useCheckUser } from "../shared/hooks/useCheckUser"
import Orders from "../modules/orders/ui/orders"

export default function PersonalAccountPage() {
	const { getUser } = useCheckUser()
	useEffect(() => {
		getUser()
	}, [getUser])
	return (
    <main>
      <Orders/>
    </main>
  )
}
