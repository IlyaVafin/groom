import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.tsx"
import "./fonts.css"
import "./index.css"
import UserContextProvider from "./shared/context/user/user-context-provider.tsx"
import OrdersContextProvider from "./shared/context/orders/orders-context-provider.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<OrdersContextProvider>
				<UserContextProvider>
					<App />
				</UserContextProvider>
			</OrdersContextProvider>
		</BrowserRouter>
	</StrictMode>,
)
