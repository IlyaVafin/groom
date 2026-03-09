import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"

export const getPhotosRequest = async () => {
  try {
    const response = await instance.get("/orders/images")
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}