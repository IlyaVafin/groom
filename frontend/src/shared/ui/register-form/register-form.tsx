import { MoveRight } from "lucide-react"
import Button from "../button/button"
import Card from "../card/card"
import Input from "../input/input"
import { useSubmit } from "./model/useSubmit"
import styles from "./register-form.module.css"
export default function RegisterForm({ checkboxId, prefix }: { checkboxId: string, prefix: string }) {
	const {
		checkboxError,
		emailError,
		loginError,
		nameError,
		passwordError,
		repeatPasswordError,
		setIsChecked,
		submitRegisterForm,
		apiError,
		isChecked,
	} = useSubmit()
	return (
		<form onSubmit={submitRegisterForm} className={styles.form}>
			<Card className={styles.formCard}>
				<div className={styles.formFields}>
					<div className={styles.formField}>
						<label htmlFor={`${prefix}-full-name`}>ФИО</label>
						<Input
							variant='white'
							type='text'
							id={`${prefix}-full-name`}
							placeholder='Иван Иванов Иванович'
							autoComplete='name'
							name='name'
						/>
						{nameError && <p className={styles.errorLabel}>{nameError}</p>}
					</div>
					<div className={styles.formField}>
						<label htmlFor={`${prefix}-login`}>Логин</label>
						<Input
							placeholder='Ivan'
							name='login'
							variant='white'
							type='text'
							id={`${prefix}-login`}
						/>
						{loginError && <p className={styles.errorLabel}>{loginError}</p>}
					</div>
					<div className={styles.formField}>
						<label htmlFor={`${prefix}-email`}>Почта</label>
						<Input
							variant='white'
							type='email'
							autoComplete='email'
							placeholder='johndoe@gmail.com'
							id={`${prefix}-email`}
							name='email'
						/>
						{emailError && <p className={styles.errorLabel}>{emailError}</p>}
					</div>
					<div className=''>
						<div className={styles.formField}>
							<label htmlFor={`${prefix}-password`}>Пароль</label>
							<Input
								variant='white'
								type='password'
								id={`${prefix}-password`}
								autoComplete='new-password'
								name='new-password'
								placeholder='••••••••'
							/>
							{passwordError && (
								<p className={styles.errorLabel}>{passwordError}</p>
							)}
						</div>
						<div className={`${styles.formField} ${styles.confirmPassword}`}>
							<label htmlFor={`${prefix}-confirm-password`}>Подтвердите пароль</label>
							<Input
								variant='white'
								id={`${prefix}-confirm-password`}
								type='password'
								placeholder='••••••••'
								autoComplete='current-password'
								name='repeat-password'
							/>
							{repeatPasswordError && (
								<p className={styles.errorLabel}>{repeatPasswordError}</p>
							)}
						</div>
					</div>
					<div
						className={`${styles.checkboxField} ${checkboxError && !isChecked ? styles.errorCheckbox : ""}`}
					>
						<input
							className={styles.checkbox}
							onChange={e => setIsChecked(e.target.checked)}
							type='checkbox'
							id={checkboxId}
						/>
						<label htmlFor={checkboxId}>
							Я даю согласие на обработку <u>персональных данных</u>
						</label>
					</div>
				</div>
				<Button className={styles.registerButton} variant='black'>
					Зарегистрироваться
					<MoveRight />
				</Button>
				{apiError && <p className={styles.apiError}>{apiError}</p>}
			</Card>
		</form>
	)
}
