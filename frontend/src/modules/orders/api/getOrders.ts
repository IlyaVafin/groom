import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"
import type { Order } from "../types"

export const getOrders = async (): Promise<Order[] | string> => {
	try {
		const response = await instance.get<Order[]>("/order")
		return response.data
	} catch (error: unknown) {
		return errorHandler(error)
	}
}
