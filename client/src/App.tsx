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
import AddMember from "./components/project_details/add_member/AddMember";
import SuccessfullAction from "./commons/successfull_action/SuccessfullAction";
import DeleteTask from "./components/project_details/delete_task/DeleteTask";
import EditTask from "./components/project_details/edit_task/EditTask";
import AdminGuard from "./guards/AdminGuard";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/user_profile/UserProfile";
import EditProfile from "./components/profile/edit_profile/EditProfile";
import ChangePassword from "./components/profile/change_password/ChangePassword";
import SuccessfullyChanged from "./components/profile/successfully_changed/SuccessfullyChanged";
import ProgrammerGuard from "./guards/ProgrammerGuard";
import AdminPanel from "./components/admin_panel/AdminPanel";
import TaskDetails from "./components/project_details/task_details/TaskDetails";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
	return (
		<>
			<Header />
			<Main>
				<ErrorBoundary>
					<Routes>
						<Route element={<UserGuard />}>
							<Route path="/" element={<Home />} />
							<Route path="/logout" element={<Logout />} />
							<Route element={<AdminGuard />}>
								<Route
									path="/create"
									element={<CreateProject />}
								/>
							</Route>
							<Route path="/profile" element={<Profile />}>
								<Route path="edit" element={<EditProfile />} />
								<Route
									path="change-password"
									element={<ChangePassword />}
								/>
								<Route
									path="successfully-changed"
									element={<SuccessfullyChanged />}
								/>
								<Route
									path="task/:taskId"
									element={<TaskDetails />}
								/>
							</Route>
							<Route
								path="/profile/:userId"
								element={<UserProfile />}
							/>
							<Route element={<ProgrammerGuard />}>
								<Route
									path="/admins"
									element={<AdminPanel />}
								/>
							</Route>
							<Route
								path="/projects/:projectId"
								element={<ProjectDetails />}
							>
								<Route
									path="task/:taskId"
									element={<TaskDetails />}
								/>
								<Route element={<AdminGuard />}>
									<Route
										path="members"
										element={<Members />}
									/>
									<Route
										path="add-task"
										element={<AddTask />}
									/>
									<Route
										path="delete"
										element={<ProjectDelete />}
									/>
									<Route
										path="edit"
										element={<ProjectEdit />}
									/>
									<Route
										path="add-member"
										element={<AddMember />}
									/>
									<Route
										path="successfull-action/:username/:flag"
										element={<SuccessfullAction />}
									/>
									<Route
										path="delete/:taskId"
										element={<DeleteTask />}
									/>
									<Route
										path="edit/:taskId"
										element={<EditTask />}
									/>
								</Route>
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
				</ErrorBoundary>
			</Main>
			<Footer />
		</>
	);
}

export default App;
