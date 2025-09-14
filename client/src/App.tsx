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
import ProjectDetails from "./components/project_details/ProjectDetails";
import Members from "./components/project_details/members/Members";
import AddTask from "./components/project_details/add_task/AddTask";
import ProjectDelete from "./components/project_details/delete_project/ProjectDelete";
import ProjectEdit from "./components/project_details/edit_project/ProjectEdit";

function App() {
	return (
		<>
			<Header />
			<Main>
				<Routes>
					<Route element={<UserGuard />}>
						<Route path="/" element={<Home />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/create" element={<CreateProject />} />
						<Route
							path="/projects/:projectId"
							element={<ProjectDetails />}
						>
							<Route path="members" element={<Members />} />
							<Route path="add-task" element={<AddTask/>}/>
							<Route path="delete" element={<ProjectDelete/>}/>
							<Route path="edit" element={<ProjectEdit/>}/>
						</Route>
					</Route>
					<Route element={<GuestGuard />}>
						<Route
							path="/registration"
							element={<RegistrationWrapper />}
						/>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Main>
			<Footer />
		</>
	);
}

export default App;
