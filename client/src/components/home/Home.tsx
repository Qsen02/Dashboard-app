import { useSelector } from "react-redux";
import { useGetUserProjects } from "../../hooks/useUser";
import { RootState } from "../../redux/state/store";
import styles from "./HomeStyles.module.css";
import ProjectItem from "../../commons/project_item/ProjectItem";

export default function Home() {
	const { user } = useSelector((state: RootState) => state.user);
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projects, loading, error } = useGetUserProjects([], user?._id);

	return (
		<>
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<div
					className={`
						${theme === "light"
							? "lightThemeNormal"
							: "darkThemeNormal"}
						errorMessage
					`}
				>
					<h2>Server is not responding! Please try again later.</h2>
				</div>
			) : (
				<section className={styles.container}>
					<div
						className={`${styles.plusContainer} ${
							theme === "light"
								? "lightThemeSmoked"
								: "darkThemeLighter"
						}`}
						title="Create new project"
					>
						<i className="fa-solid fa-plus"></i>
					</div>
					<h2>The projects you are involved in</h2>
					<section className={styles.projectWrapper}>
						{projects.length > 0 ? (
							projects.map((el) => (
								<ProjectItem
									key={el._id}
									id={el._id}
									name={el.name}
									theme={theme}
									membersCount={el.members.length}
									tasksCount={el.tasks.length}
								/>
							))
						) : (
							<h2>No projects yet</h2>
						)}
					</section>
				</section>
			)}
		</>
	);
}
