import type { User } from "../types"
import { errorHandler } from "./errorHandler"
import { instance } from "./instance"

interface ResponseUser extends Omit<User, 'superuser'> {
  superuser: string
}
export const getMe = async (): Promise<ResponseUser | string> => {
  try {
    const response = await instance.get<ResponseUser>("/auth/me")
    return response.data
  } catch (error: unknown) {
    return errorHandler(error)
  }
}