import type { HTMLAttributes, ReactNode } from "react"
import styles from "./card.module.css"
interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	className?: string
}
export default function Card({ children, className, ...rest }: CardProps) {
	return (
		<div {...rest} className={`${className} ${styles.card}`}>
			{children}
		</div>
	)
}
