import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import RegistrationWrapper from "./components/registrarion_wrapper/RegistrationWrapper";
import UserGuard from "./guards/UserGuard";
import GuestGuard from "./guards/GuestGuard";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<>
			<Header />
			<Main>
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
			</Main>
			<Footer/>
		</>
	);
}

export default App;
