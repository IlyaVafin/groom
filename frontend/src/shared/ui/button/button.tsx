import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router"
import styles from "./button.module.css"
interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
	children: ReactNode
	variant: "black" | "icon"
	href?: string
}
export default function Button({
	children,
	href,
	variant,
	className = "",
	...rest
}: ButtonProps) {
	const classNames = `${variant === "black" ? `${styles.blackButton}` : variant === "icon" ? `${styles.iconButton}` : ""} ${className}`
	return (
		<>
			{href ? (
				<Link
					className={classNames}
					to={href}
				>
					{children}
				</Link>
			) : (
				<button
					className={classNames}
					{...rest}
				>
					{children}
				</button>
			)}
		</>
	)
}
