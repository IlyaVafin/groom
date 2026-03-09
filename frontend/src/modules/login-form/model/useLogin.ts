import { useEffect, useState, type SubmitEvent } from "react"
import { sendLogin } from "../api/send-login"
import { useNavigate } from "react-router"
const loginRegex = /^[A-Za-z-]+$/
export const useLogin = () => {
  const navigate = useNavigate()
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const [disabled, setDisabled] = useState(true)
  const [apiError, setApiError] = useState("")
	useEffect(() => {
		function checkFields() {
			if (!loginRegex.test(login.trim()) || !password.trim().length) {
				setDisabled(true)
			} else {
				setDisabled(false)
			}
		}
		checkFields()
	}, [login, password])
	async function submitLogin(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault()
		const data = { login: login.trim(), password: password.trim() }
		const response = await sendLogin(data)
    if(typeof(response) === "string") {
      setApiError(response)
    } else {
      e.target.reset()
      navigate("/personal-account")
      setDisabled(true)
    }
	}
	return {
		password,
		login,
		disabled,
		setLogin,
		setPassword,
		submitLogin,
    apiError
	}
}
