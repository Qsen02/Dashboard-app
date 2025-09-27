import { useParams } from "react-router-dom";
import { useGetOneTask } from "../../../hooks/useTasks";
import { transformDate } from "../../../utils/transformDate";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import styles from "./TaskDetailsStyles.module.css";

export default function TaskDetails() {
	const { user } = useSelector((state: RootState) => state.user);
	const { theme } = useSelector((state: RootState) => state.theme);
	const { taskId, projectId } = useParams();
	const { task, loading, error } = useGetOneTask(null, taskId);

	function onClose() {
		history.back();
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}`}
			>
				{loading && !error ? (
					<span className="loader"></span>
				) : error ? (
					<p className="error">
						Server is not responding, please try again later.
					</p>
				) : (
					<>
						<button onClick={onClose}>X</button>
						<h2>{task?.title}</h2>
						<p>{task?.description}</p>
						<p>Status: {task?.status}</p>
						<p>
							Applied By:{" "}
							{task?.appliedBy
								? task.appliedBy.username
								: "No users applied yet"}
						</p>
						<p>Created on: {transformDate(task?.created_at)}</p>
						{task?.ownerId._id === user?._id ? (
							<div className={styles.buttonWrapper}>
								<button>Edit</button>
								<button>Delete</button>
							</div>
						) : (
							""
						)}
					</>
				)}
			</section>
		</div>
	);
}
