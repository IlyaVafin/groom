import { AxiosError } from "axios"

export function errorHandler(e: unknown) {
	if (e instanceof AxiosError) {
		return e.response?.data.detail
	} else if (e instanceof Error) {
		return e.message
	}
	return "Unknown"
}
