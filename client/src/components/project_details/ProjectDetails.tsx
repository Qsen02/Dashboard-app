import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
				<section>
					<h2>{project?.name}</h2>
					<div>
						<Link to={`/projects/${projectId}/add-member`}>
							<button>Add member</button>
						</Link>
						<Link to={`/projects/${projectId}/members`}>
							<button>Members</button>
						</Link>
						<Link to={`/projects/${projectId}/add-task`}>
							<button>Add task</button>
						</Link>
					</div>
					<section
						className={
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						}
					>
						<article>
							<div>
								<p>Pending</p>
							</div>
							<div>
								{project?.tasks
									.filter((el) => el.status === "pending")
									.map((el) => (
										<p key={el._id}>{el.title}</p>
									))}
							</div>
						</article>
						<article>
							<div>
								<p>In progress</p>
							</div>
							<div>
								{project?.tasks
									.filter((el) => el.status === "in-progress")
									.map((el) => (
										<p key={el._id}>{el.title}</p>
									))}
							</div>
						</article>
						<article>
							<div>
								<p>Completed</p>
							</div>
							<div>
								{project?.tasks
									.filter((el) => el.status === "completed")
									.map((el) => (
										<p key={el._id}>{el.title}</p>
									))}
							</div>
						</article>
					</section>
				</section>
			)}
		</>
	);
}
