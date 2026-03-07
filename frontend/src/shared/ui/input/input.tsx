import type { InputHTMLAttributes, ReactNode } from "react"
import styles from "./input.module.css"
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	variant: "white" | "black"
	className?: string
	icon?: ReactNode
}
export default function Input({
	variant,
	className = "",
	icon,
	...rest
}: InputProps) {
	const classNames = `${variant === "white" ? styles.whiteInput : styles.blackInput} ${className}`
	return (
		<>
			{icon ? (
				<div className={styles.inputWrapper}>
					<input className={classNames} {...rest} />
					{icon}
				</div>
			) : (
				<input className={classNames} {...rest} />
			)}
		</>
	)
}
