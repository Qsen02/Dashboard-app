import { Outlet } from "react-router-dom";
import { useInitialLoad } from "../../hooks/useUser";

export default function InitialLoad() {
	const { loading, error } = useInitialLoad();
	return (
		<>
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<div className="errorMessage">
					<h2>Server is not responding! Please try again later.</h2>
				</div>
			) : (
				<Outlet/>
			)}
		</>
	);
}
