import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"

export const logoutRequest = async () => {
  try {
    const response = await instance.post("/auth/logout")
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}