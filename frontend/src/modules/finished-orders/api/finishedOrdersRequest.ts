import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"

export const finishedOrdersRequest = async () => {
  try {
    const response = await instance.get("/order/finished")
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}