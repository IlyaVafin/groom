import { useState, type SubmitEvent } from "react"
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
	const [isChecked, setIsChecked] = useState(false)
	function addError(errorMessage: string, field: string) {
		setErrors(prev => ({ ...prev, [field]: errorMessage }))
	}
	function resetError(field: string) {
		setErrors(prev => ({ ...prev, [field]: "" }))
	}

	function submitRegisterForm(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const name = formData.get("name")?.toString() ?? ""
		const login = formData.get("login")?.toString() ?? ""
		const email = formData.get("email")?.toString() ?? ""
		const password = formData.get("new-password")?.toString() ?? ""
		console.log(password)

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
			alert("Все хорошо")
			e.target.reset()
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
    isChecked
  }
}
