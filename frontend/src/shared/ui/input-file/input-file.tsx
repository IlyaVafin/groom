import type { InputHTMLAttributes, ReactNode } from "react"
import styles from "./input-file.module.css"

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
	label: ReactNode
}

export default function InputFile({ label, ...rest }: InputFileProps) {
	return (
		<div className={styles.fileWrapper}>
			<input {...rest} type='file' />
			{label}
		</div>
	)
}
