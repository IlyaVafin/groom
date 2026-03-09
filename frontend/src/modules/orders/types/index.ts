export interface Order {
	status: string 
	nickname: string 
	photo: string 
	user_id: string 
	result_photo: string | null
	id: string 
	created_at: string
}

export enum OrderStatus {
	NEW = "Новая",
	PROCESSING = "Обработка данных",
	READY = "Услуга оказана",
}
