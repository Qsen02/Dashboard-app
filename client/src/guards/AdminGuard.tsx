import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { ProjectOutletContext } from "../types/outlet_context";

export default function AdminGuard() {
	const { user } = useSelector((state: RootState) => state.user);
	const outletContext = useOutletContext<ProjectOutletContext>();

	return (
		<>
			{user?.role === "admin" ? (
				<Outlet
					context={{
						setProjectHandler: outletContext?.setProjectHandler,
						owner: outletContext?.owner,
						members: outletContext?.members,
						projectName: outletContext?.projectName,
					}}
				/>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
