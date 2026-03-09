import { Route, Routes } from "react-router"
import Home from "./pages/home"
import LoginPage from "./pages/login"
import PersonalAccountPage from "./pages/personal-account"

const App = () => {
	
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/personal-account' element={<PersonalAccountPage />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	)
}

export default App
