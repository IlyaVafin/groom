import Button from "../../shared/ui/button/button"
import Card from "../../shared/ui/card/card"
import Heading from "../../shared/ui/heading/heading"
import Input from "../../shared/ui/input/input"
import styles from "./login-form.module.css"
import { useLogin } from "./model/useLogin"
export default function LoginForm() {
	const {disabled, login, password, setLogin, setPassword, submitLogin, apiError} = useLogin()
	return (
		<form className={styles.loginForm} onSubmit={submitLogin}>
			<Heading className={styles.heading} as='h1'>
				Groomer
			</Heading>
			<Card className={styles.loginFormCard}>
				<div className={styles.formField}>
					<label htmlFor='login'>Логин</label>
					<Input
						value={login}
						onChange={e => setLogin(e.target.value)}
						className={styles.formInput}
						variant='white'
						placeholder='Ivan'
						type='text'
						id='login'
					/>
				</div>
				<div className={styles.formField}>
					<label htmlFor='password'>Пароль</label>
					<Input
						value={password}
						onChange={e => setPassword(e.target.value)}
						className={styles.formInput}
						variant='white'
						placeholder='••••••••'
						type='password'
						id='password'
					/>
				</div>
				<Button
					disabled={disabled}
					className={`${styles.loginSubmitButton} ${disabled ? styles.disabled : ""}`}
					variant='black'
				>
					Войти
				</Button>
				{apiError && <p className="apiError">{apiError}</p>}
			</Card>
		</form>
	)
}
