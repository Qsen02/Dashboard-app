import { useNavigate } from "react-router-dom";
import { TaskStatus } from "../../types/task";
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

	function navigateToDelete() {
		if (projectId) {
			navigate(`/projects/${projectId}/delete/${id}`);
		} else {
			navigate("404");
		}
	}

	function navigateToEdit() {
		if (projectId) {
			navigate(`/projects/${projectId}/edit/${id}`);
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

	async function changeToInProgress() {
		try {
			const updatedProject = await changeTaskStatus(id, {
				status: "in-progress",
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
					<button onClick={navigateToEdit}>Edit</button>
					<button onClick={navigateToDelete}>Delete</button>
				</div>
			) : status === "pending" ? (
				<div className={styles.buttonWrapper}>
					{!appliedBy ? <button onClick={onApply}>Apply</button> : ""}
					{user?._id === appliedBy?._id ? (
						<button onClick={changeToInProgress}>Move</button>
					) : (
						""
					)}
				</div>
			) : status === "in-progress" ? (
				<div className={styles.buttonWrapper}>
					{user?._id === appliedBy?._id ? (
						<>
							<button>Return</button>
							<button>Succeeded</button>
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
