import type { HTMLAttributes, ReactNode } from "react"
import styles from './heading.module.css'
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	children: ReactNode
	className?: string
}
export default function Heading({
	children,
	as,
	className,
	...rest
}: HeadingProps) {
	const Tag = as
	return (
		<Tag {...rest} className={`${styles[as]} ${className ?? ""}`}>
			{children}
		</Tag>
	)
}
