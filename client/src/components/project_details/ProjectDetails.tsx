import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../redux/state/store";
import { useGetOneProject } from "../../hooks/useProjects";
import styles from "./ProjectDetailsStyles.module.css";
import TaskItem from "../../commons/task_item/TaskItem";

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
				<section className={styles.wrapper}>
					<h2>{project?.name}</h2>
					{user?._id === project?.ownerId._id ? (
						<div className={styles.buttonWrapper}>
							<Link to={`/projects/${projectId}/add-member`}>
								<button>Add member</button>
							</Link>
							<Link to={`/projects/${projectId}/members`}>
								<button>Members</button>
							</Link>
							<Link to={`/projects/${projectId}/add-task`}>
								<button>Add task</button>
							</Link>
							<Link to={`/projects/${projectId}/edit`}>
								<button>Edit</button>
							</Link>
							<Link to={`/projects/${projectId}/delete`}>
								<button>Delete</button>
							</Link>
						</div>
					) : (
						""
					)}
					<section
						className={`
							${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
                                ${styles.dashboardWrapper}
						`}
					>
						<section
							className={`${styles.dashboardHeader} ${
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}`}
						>
							<article>
								<p>Pending</p>
							</article>
							<article>
								<p>In progress</p>
							</article>
							<article>
								<p>Completed</p>
							</article>
						</section>
						<section className={styles.dashboardBody}>
							<article>
								{project?.tasks
									.filter((el) => el.status === "pending")
									.map((el) => (
										<TaskItem
											key={el._id}
											id={el._id}
											title={el.title}
											description={el.description}
											user={user}
											status={el.status}
											owner={project.ownerId}
										/>
									))}
							</article>
							<article>
								{project?.tasks
									.filter((el) => el.status === "in-progress")
									.map((el) => (
										<TaskItem
											key={el._id}
											id={el._id}
											title={el.title}
											description={el.description}
											user={user}
											status={el.status}
											owner={project.ownerId}
										/>
									))}
							</article>
							<article>
								{project?.tasks
									.filter((el) => el.status === "completed")
									.map((el) => (
										<TaskItem
											key={el._id}
											id={el._id}
											title={el.title}
											description={el.description}
											user={user}
											status={el.status}
											owner={project.ownerId}
										/>
									))}
							</article>
						</section>
					</section>
				</section>
			)}
		</>
	);
}
