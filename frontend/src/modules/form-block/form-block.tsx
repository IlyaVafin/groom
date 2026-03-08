import { Cat, MoveRight } from "lucide-react"
import Button from "../../shared/ui/button/button"
import Card from "../../shared/ui/card/card"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import Input from "../../shared/ui/input/input"
import styles from "./form-block.module.css"
import { useSubmit } from "./model/useSubmit"

export default function FormBlock() {
	const {
		checkboxError,
		emailError,
		loginError,
		nameError,
		passwordError,
		repeatPasswordError,
		setIsChecked,
		submitRegisterForm,
		isChecked
	} = useSubmit()
	return (
		<section className={styles.formBlock}>
			<Container>
				<Heading className={styles.heading} as='h2'>
					Присоединяйтесь к нам <Cat height={36} width={36} />
				</Heading>
				<div className={styles.formContent}>
					<form onSubmit={submitRegisterForm} className={styles.form}>
						<Card className={styles.formCard}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label htmlFor='full-name'>ФИО</label>
									<Input
										variant='white'
										type='text'
										id='full-name'
										autoComplete='name'
										name='name'
									/>
									{nameError && (
										<p className={styles.errorLabel}>{nameError}</p>
									)}
								</div>
								<div className={styles.formField}>
									<label htmlFor='login'>Логин</label>
									<Input
										name='login'
										variant='white'
										type='text'
										id='login'
									/>
									{loginError && (
										<p className={styles.errorLabel}>{loginError}</p>
									)}
								</div>
								<div className={styles.formField}>
									<label htmlFor='email'>Почта</label>
									<Input
										variant='white'
										type='email'
										autoComplete='email'
										id='email'
										name='email'
									/>
									{emailError && (
										<p className={styles.errorLabel}>{emailError}</p>
									)}
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
										/>
										{passwordError && (
											<p className={styles.errorLabel}>{passwordError}</p>
										)}
									</div>
									<div
										className={`${styles.formField} ${styles.confirmPassword}`}
									>
										<label htmlFor='confirm-password'>Подтвердите пароль</label>
										<Input
											variant='white'
											id='confirm-password'
											type='password'
											placeholder=''
											autoComplete='current-password'
											name='repeat-password'
										/>
										{repeatPasswordError && <p>{repeatPasswordError}</p>}
									</div>
								</div>
								<div className={styles.checkboxField}>
									<input
										onChange={e => setIsChecked(e.target.checked)}
										type='checkbox'
										id='personal-data'
									/>
									<label htmlFor='personal-data'>
										Я даю согласие на обработку <u>персональных данных</u>
									</label>
									{checkboxError && !isChecked && (
										<p className={styles.errorLabel}>{checkboxError}</p>
									)}
								</div>
							</div>
							<Button className={styles.registerButton} variant='black'>
								Зарегистрироваться
								<MoveRight />
							</Button>
						</Card>
					</form>
				</div>
			</Container>
		</section>
	)
}
