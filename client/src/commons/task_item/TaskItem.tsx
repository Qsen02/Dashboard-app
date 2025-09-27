import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../types/task";
import { User, UserForAuth } from "../../types/user";
import styles from "./TaskItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";
import { useApplyForTask, useChangeTaskStatus } from "../../hooks/useTasks";
import { Project } from "../../types/project";
import { addDots } from "../../utils/textTransform";

interface TaskItemProps {
	id: string;
	title: string;
	user: UserForAuth | null;
	status: TaskStatus;
	appliedBy: User | undefined;
	projectHandler: React.Dispatch<React.SetStateAction<Project | null>>;
	projectId: string | undefined;
}

export default function TaskItem({
	id,
	title,
	user,
	status,
	appliedBy,
	projectHandler,
	projectId,
}: TaskItemProps) {
	const navigate = useNavigate();
	const applyToTask = useApplyForTask();
	const changeTaskStatus = useChangeTaskStatus();

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

	function navigateToInfo() {
		try {
			navigate(`/projects/${projectId}/task/${id}`);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article className={styles.wrapper}>
			<button className={styles.info} onClick={navigateToInfo}>
				<i className="fa-solid fa-info"></i>
			</button>
			<h3>{title.length > 20 ? addDots(title) : title}</h3>
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
			{status === "pending" ? (
				<div className={styles.buttonWrapper}>
					{!appliedBy && user?.role === "user" ? (
						<button onClick={onApply}>Apply</button>
					) : (
						""
					)}
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
				<>
					<div className={styles.buttonWrapper}>
						<i className="fa-solid fa-circle-check"></i>
					</div>
				</>
			)}
		</article>
	);
}
