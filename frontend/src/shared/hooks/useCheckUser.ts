import { useNavigate } from "react-router"
import { getMe } from "../api/getMe"
import { useUserContext } from "../context/user/useUserContext"
import { refreshToken } from "../api/refreshToken"

export const useCheckUser = () => {
	const navigate = useNavigate()
	const { updateUser } = useUserContext()
	async function getUser() {
		const response = await getMe()
		if (typeof response === "string") {
			const refresh = await refreshToken()
			if (typeof refresh === "string") {
				updateUser(null)
				navigate("/")
			} else {
				window.location.reload()
			}
		} else {
			updateUser({
				...response,
				superuser: response.superuser === "False" ? false : true,
			})
		}
	}
	return {
		getUser,
	}
}
