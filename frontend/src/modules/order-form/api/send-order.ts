import { errorHandler } from "../../../shared/api/errorHandler"
import { instance } from "../../../shared/api/instance"

export const sendOrder = async (photo: File | undefined, nickname: string) => {
	try {
    if(!photo) return
		const formData = new FormData()
		formData.append("file", photo)
		formData.append("nickname", nickname)
		const response = await instance.post("/order", formData)
		return response.data
	} catch (error: unknown) {
		return errorHandler(error)
	}
}
