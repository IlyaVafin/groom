import { MoveRight } from "lucide-react"
import Button from "../button/button"
import Card from "../card/card"
import Input from "../input/input"
import { useSubmit } from "./model/useSubmit"
import styles from "./register-form.module.css"
export default function RegisterForm() {
	const {
		checkboxError,
		emailError,
		loginError,
		nameError,
		passwordError,
		repeatPasswordError,
		setIsChecked,
		submitRegisterForm,
		isChecked,
	} = useSubmit()
	return (
		<form onSubmit={submitRegisterForm} className={styles.form}>
			<Card className={styles.formCard}>
				<div className={styles.formFields}>
					<div className={styles.formField}>
						<label htmlFor='full-name'>ФИО</label>
						<Input
							variant='white'
							type='text'
							id='full-name'
              placeholder="Иван Иванов Иванович"
							autoComplete='name'
							name='name'
						/>
						{nameError && <p className={styles.errorLabel}>{nameError}</p>}
					</div>
					<div className={styles.formField}>
						<label htmlFor='login'>Логин</label>
						<Input placeholder="Ivan" name='login' variant='white' type='text' id='login' />
						{loginError && <p className={styles.errorLabel}>{loginError}</p>}
					</div>
					<div className={styles.formField}>
						<label htmlFor='email'>Почта</label>
						<Input
							variant='white'
							type='email'
							autoComplete='email'
              placeholder="johndoe@gmail.com"
							id='email'
							name='email'
						/>
						{emailError && <p className={styles.errorLabel}>{emailError}</p>}
					</div>
					<div className=''>
						<div className={styles.formField}>
							<label htmlFor='password'>Пароль</label>
							<Input
								variant='white'
								type='password'
								id='password'
								autoComplete='new-password'
								name='new-password'
                placeholder="********"
							/>
							{passwordError && (
								<p className={styles.errorLabel}>{passwordError}</p>
							)}
						</div>
						<div className={`${styles.formField} ${styles.confirmPassword}`}>
							<label htmlFor='confirm-password'>Подтвердите пароль</label>
							<Input
								variant='white'
								id='confirm-password'
								type='password'
								placeholder='********'
								autoComplete='current-password'
								name='repeat-password'
							/>
							{repeatPasswordError && <p className={styles.errorLabel}>{repeatPasswordError}</p>}
						</div>
					</div>
					<div
						className={`${styles.checkboxField} ${checkboxError && !isChecked ? styles.errorCheckbox : ""}`}
					>
						<input
							className={styles.checkbox}
							onChange={e => setIsChecked(e.target.checked)}
							type='checkbox'
							id='personal-data'
						/>
						<label htmlFor='personal-data'>
							Я даю согласие на обработку <u>персональных данных</u>
						</label>
					</div>
				</div>
				<Button className={styles.registerButton} variant='black'>
					Зарегистрироваться
					<MoveRight />
				</Button>
			</Card>
		</form>
	)
}
