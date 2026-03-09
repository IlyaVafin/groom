import { Route, Routes } from "react-router"
import Home from "./pages/home"
import LoginPage from "./pages/login"
import PersonalAccountPage from "./pages/personal-account"
import GroomPage from "./pages/groom"

const App = () => {

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/personal-account' element={<PersonalAccountPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path="/groom" element={<GroomPage/>}/>
		</Routes>
	)
}

export default App
