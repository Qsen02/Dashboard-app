import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import RegistrationWrapper from "./components/registrarion_wrapper/RegistrationWrapper";
import UserGuard from "./guards/userGuard";
import GuestGuard from "./guards/GuestGuard";

function App() {
	return (
		<>
			<Routes>
				<Route element={<UserGuard />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<GuestGuard />}>
					<Route
						path="/registration"
						element={<RegistrationWrapper />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
