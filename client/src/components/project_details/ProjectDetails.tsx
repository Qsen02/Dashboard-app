import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/state/store";
import { useGetOneProject } from "../../hooks/useProjects";

export default function ProjectDetails() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { user } = useSelector((state: RootState) => state.user);
	const { projectId } = useParams();
	const { project, error, loading } = useGetOneProject(null, projectId);

	return (
		<>
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<div
					className={`
						${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
						errorMessage
					`}
				>
					<h2>Server is not responding! Please try again later.</h2>
				</div>
			) : (
				<div>
					<p>Project id: {project?._id}</p>
				</div>
			)}
		</>
	);
}
