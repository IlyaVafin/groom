import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./fonts.css"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import UserContextProvider from "./shared/context/user/userContextProvider.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</BrowserRouter>
	</StrictMode>,
)
