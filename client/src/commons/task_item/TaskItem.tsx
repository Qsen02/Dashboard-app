import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../types/task";
import { User, UserForAuth } from "../../types/user";
import styles from "./TaskItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";
import { useApplyForTask, useChangeTaskStatus } from "../../hooks/useTasks";
import { Project } from "../../types/project";

interface TaskItemProps {
	id: string;
	title: string;
	description: string;
	user: UserForAuth | null;
	owner: User;
	status: TaskStatus;
	projectId: string | undefined;
	appliedBy: User | undefined;
	projectHandler: React.Dispatch<React.SetStateAction<Project | null>>;
}

export default function TaskItem({
	id,
	title,
	description,
	user,
	owner,
	status,
	projectId,
	appliedBy,
	projectHandler,
}: TaskItemProps) {
	const navigate = useNavigate();
	const applyToTask = useApplyForTask();
	const changeTaskStatus = useChangeTaskStatus();

	function navigating(action: "delete" | "edit") {
		if (projectId) {
			navigate(`/projects/${projectId}/${action}/${id}`);
		} else {
			navigate("404");
		}
	}

	async function onApply() {
		try {
			const updatedProject = await applyToTask(id);
			projectHandler(updatedProject);
		} catch (err) {
			navigate("404");
		}
	}

	async function changeStatus(status: Task["status"]) {
		try {
			const updatedProject = await changeTaskStatus(id, {
				status: status,
			});
			projectHandler(updatedProject);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article className={styles.wrapper}>
			<h3>{title}</h3>
			<p>{description}</p>
			{appliedBy ? (
				<div className={styles.userWrapper}>
					<p>Applied By:</p>
					<img
						src={appliedBy.profileImage}
						alt={appliedBy.username}
						onError={profileImageError}
					/>
					<p>{appliedBy.username}</p>
				</div>
			) : (
				<p>No users applied yet</p>
			)}
			{user?._id === owner._id ? (
				<div className={styles.buttonWrapper}>
					<button onClick={() => navigating("edit")}>Edit</button>
					<button onClick={() => navigating("delete")}>Delete</button>
				</div>
			) : status === "pending" ? (
				<div className={styles.buttonWrapper}>
					{!appliedBy ? <button onClick={onApply}>Apply</button> : ""}
					{user?._id === appliedBy?._id ? (
						<button onClick={() => changeStatus("in-progress")}>
							Move
						</button>
					) : (
						""
					)}
				</div>
			) : status === "in-progress" ? (
				<div className={styles.buttonWrapper}>
					{user?._id === appliedBy?._id ? (
						<>
							<button onClick={() => changeStatus("pending")}>
								Return
							</button>
							<button onClick={() => changeStatus("completed")}>
								Succeeded
							</button>
						</>
					) : (
						""
					)}
				</div>
			) : (
				<div className={styles.buttonWrapper}>
					<i className="fa-solid fa-circle-check"></i>
				</div>
			)}
		</article>
	);
}
