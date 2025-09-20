import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { ProjectOutletContext } from "../types/outlet_context";

export default function AdminGuard() {
	const { user } = useSelector((state: RootState) => state.user);
	const { setProjectHandler, owner, members, projectName } =
		useOutletContext<ProjectOutletContext>();

	return (
		<>
			{user?.role === "admin" ? (
				<Outlet
					context={{ setProjectHandler, owner, members, projectName }}
				/>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
