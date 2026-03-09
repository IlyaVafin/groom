export interface User {
	id: string
	login: string
	superuser: boolean
}

export interface Order {
	status: string 
	nickname: string 
	photo: string 
	user_id: string 
	result_photo: string | null
	id: string 
	created_at: string
}