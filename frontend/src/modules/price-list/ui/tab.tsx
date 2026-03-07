import type { HTMLAttributes, ReactNode } from "react"
import styles from './../price-list.module.css'
interface TabProps extends HTMLAttributes<HTMLButtonElement> {
	children: ReactNode
  isActive: boolean
}
export default function Tab({ children, isActive, ...rest }: TabProps) {
  const classNames = `${styles.tab} ${isActive ? styles.active : ""}`
	return <button className={classNames}  {...rest}>{children}</button>
}
