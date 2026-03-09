import { useState, type ReactNode } from "react"
import type { User } from "../../types"
import { UserContext } from "./userContext"

export interface UserContextType {
	user: User | null
	updateUser: (data: User | null) => void
}

export default function UserContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [user, setUser] = useState<User | null>(null)
	function updateUser(data: User | null) {
		setUser(data)
	}
	return (
		<UserContext.Provider value={{ updateUser, user }}>
			{children}
		</UserContext.Provider>
	)
}
