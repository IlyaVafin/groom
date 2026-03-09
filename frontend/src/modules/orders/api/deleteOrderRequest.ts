import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"

export const deleteOrderRequest = async (id: string) => {
  try {
    const response = await instance.delete(`/order/${id}`)
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}