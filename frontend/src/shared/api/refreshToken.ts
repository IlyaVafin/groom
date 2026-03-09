import { errorHandler } from "./errorHandler"
import { instance } from "./instance"

export const refreshToken = async () => {
  try {
    const response = await instance.post("/auth/refresh")
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}