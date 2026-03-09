import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router"
import { regsiter } from "../api/register"
import type { RegisterData } from "../types"
import { validateFields } from "./validate"

export const useSubmit = () => {
	const [errors, setErrors] = useState({
		nameError: "",
		loginError: "",
		emailError: "",
		passwordError: "",
		repeatPasswordError: "",
		checkboxError: "",
	})
	const [apiError, setApiError] = useState("")
	const navigate = useNavigate()
	const [isChecked, setIsChecked] = useState(false)
	function addError(errorMessage: string, field: string) {
		setErrors(prev => ({ ...prev, [field]: errorMessage }))
	}
	function resetError(field: string) {
		setErrors(prev => ({ ...prev, [field]: "" }))
	}

	async function submitRegisterForm(e: SubmitEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const formData = new FormData(e.target)
			const name = formData.get("name")?.toString() ?? ""
			const login = formData.get("login")?.toString() ?? ""
			const email = formData.get("email")?.toString() ?? ""
			const password = formData.get("new-password")?.toString() ?? ""
			const repeatPassword = formData.get("repeat-password")?.toString() ?? ""

			const validate = validateFields(
				name,
				login,
				email,
				password,
				repeatPassword,
				isChecked,
				resetError,
				addError,
			)
			if (validate) {
				const userData: RegisterData = {
					email: email.trim(),
					fullName: name.trim(),
					login: login.trim(),
					password: password.trim(),
					repeatPassword: repeatPassword.trim()
				}
				const response = await regsiter(userData)
				if (typeof response !== "string") {
					e.target.reset()
					navigate("/login")
				} else {
					setApiError(response)
				}
			}
		} catch (e: unknown) {
			console.log(e)
		}
	}

	const {
		checkboxError,
		emailError,
		loginError,
		nameError,
		passwordError,
		repeatPasswordError,
	} = errors
	return {
		checkboxError,
		emailError,
		loginError,
		nameError,
		passwordError,
		repeatPasswordError,
		submitRegisterForm,
		setIsChecked,
		isChecked,
		apiError,
	}
}
