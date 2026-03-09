import { useNavigate } from "react-router"
import { getMe } from "../api/getMe"
import { useUserContext } from "../context/user/useUserContext"

export const useCheckUser = () => {
	const navigate = useNavigate()
	const { updateUser } = useUserContext()
	async function getUser() {
		const response = await getMe()
		if (typeof response === "string") {
			updateUser(null)
			navigate("/")
		} else {
			updateUser({...response, superuser: response.superuser === "False" ? false : true})
		}
	}
  return {
    getUser
  }
}
