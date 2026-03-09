import { AxiosError } from "axios"
import { instance } from "../../../api/instance"
import type { RegisterData, SuccessResponse } from "../types"

export const regsiter = async (
	data: RegisterData,
): Promise<SuccessResponse | string> => {
	try {
		const response = await instance.post<SuccessResponse>("/user", {
			...data,
			repeat_password: data.repeatPassword,
		})
		return response.data
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			return e.response?.data.detail
		} else if (e instanceof Error) {
			return e.message
		}
		return "Unknown"
	}
}
