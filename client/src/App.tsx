import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import RegistrationWrapper from "./components/registrarion_wrapper/RegistrationWrapper";
import UserGuard from "./guards/UserGuard";
import GuestGuard from "./guards/GuestGuard";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logout from "./components/logout/Logout";
import NotFound from "./components/not_found/NotFound";
import CreateProject from "./components/create_project/CreateProject";

function App() {
	return (
		<>
			<Header />
			<Main>
				<Routes>
					<Route element={<UserGuard />}>
						<Route path="/" element={<Home />} />
						<Route path="/logout" element={<Logout/>}/>
						<Route path="/create" element={<CreateProject/>}/>
					</Route>
					<Route element={<GuestGuard />}>
						<Route
							path="/registration"
							element={<RegistrationWrapper />}
						/>
					</Route>
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</Main>
			<Footer/>
		</>
	);
}

export default App;
