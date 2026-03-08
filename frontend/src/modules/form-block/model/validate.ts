const nameRegex = /^[А-ЯЁа-яё\s]+$/
const loginRegex = /^[A-Za-z-]+$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export function validateFields(
	name: string,
	login: string,
	email: string,
	password: string,
	repeatPassword: string,
	isChecked: boolean,
	resetError: (field: string) => void,
	addError: (errorMessage: string, field: string) => void,
) {
	let notHasError = true
	if (!nameRegex.test(name)) {
		addError(
			"Имя должно содержать только кирилические буквы и проблелы",
			"nameError",
		)
		notHasError = false
	} else {
		resetError("nameError")
		notHasError = true
	}
	if (!loginRegex.test(login)) {
		console.log(login)

		addError(
			"Логин должен содержать только латинские буквы и дефис",
			"loginError",
		)
		notHasError = false
	} else {
		resetError("loginError")
		notHasError = true
	}
	if (!emailRegex.test(email)) {
		addError("Неккоректный email адрес", "emailError")
		notHasError = false
	} else {
		resetError("emailError")
		notHasError = true
	}
	if (password !== repeatPassword) {
		addError("Пароли не совпадают", "repeatPasswordError")
		notHasError = false
	} else {
		resetError("repeatPasswordError")
		notHasError = true
	}
	if (!password.length) {
		addError("Пароль не может быть пустым", "passwordError")
		notHasError = false
	} else {
		resetError("passwordError")
		notHasError = true
	}
	if (!isChecked) {
		addError("Согласитесь с условиями", "checkboxError")
		notHasError = false
	} else {
		resetError("checkboxError")
		notHasError = true
	}
	return notHasError
}
