import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"
import { OrderStatus } from "../types"

export const updateOrder = async (
	id: string,
	status: string,
	file?: File,
) => {
	try {
		const formData = new FormData()
		if (file && status === OrderStatus.READY) {
			formData.append("result_photo", file)
		}
		formData.append("status", status)
    console.log(status);
		const response = await instance.patch(`/order/${id}`, formData)
    return response.data
	} catch (error: unknown) {
		return errorHandler(error)
	}
}
