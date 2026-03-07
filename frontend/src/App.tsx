import { Route, Routes } from "react-router"
import Home from "./pages/home"
import LoginPage from "./pages/login"
import PersonalAccountPage from "./pages/personal-account"
import RegisterPage from "./pages/register"

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/personal-account' element={<PersonalAccountPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	)
}

export default App
