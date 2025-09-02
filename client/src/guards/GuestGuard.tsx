import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestGuard() {
	const user = useSelector((state: RootState) => state.user);

	return <>{user.user ? <Navigate to="/" /> : <Outlet />}</>;
}
