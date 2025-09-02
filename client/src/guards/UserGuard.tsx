import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { Navigate, Outlet } from "react-router-dom";

export default function UserGuard() {
	const user = useSelector((state: RootState) => state.user);

	return <>{user.user ? <Outlet /> : <Navigate to="/registration" />}</>;
}
