import { errorHandler } from "../../../api/errorHandler"
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
		return errorHandler(e)
	}
}

