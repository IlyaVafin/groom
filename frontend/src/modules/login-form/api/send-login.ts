import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"
import type { LoginData, LoginResponse } from "../types"

export const sendLogin = async (data: LoginData) => {
  try {
    const response = await instance.post<LoginResponse>("/auth/login", data)
    return response.data
  } catch (e: unknown) {
    return errorHandler(e)
  }
}