import { useNavigate } from "react-router-dom";
import { TaskStatus } from "../../types/task";
import { User, UserForAuth } from "../../types/user";
import styles from "./TaskItemStyles.module.css";

interface TaskItemProps {
	id: string;
	title: string;
	description: string;
	user: UserForAuth | null;
	owner: User;
	status: TaskStatus;
	projectId: string | undefined;
}

export default function TaskItem({
	id,
	title,
	description,
	user,
	owner,
	status,
	projectId,
}: TaskItemProps) {
	const navigate = useNavigate();

	function navigateToDelete() {
		if (projectId) {
			navigate(`/projects/${projectId}/delete/${id}`);
		} else {
			navigate("404");
		}
	}

	return (
		<article className={styles.wrapper}>
			<h3>{title}</h3>
			<p>{description}</p>
			{user?._id === owner._id ? (
				<div className={styles.buttonWrapper}>
					<button>Edit</button>
					<button onClick={navigateToDelete}>Delete</button>
				</div>
			) : status === "pending" ? (
				<div className={styles.buttonWrapper}>
					<button>Apply</button>
					<button>Move</button>
				</div>
			) : status === "in-progress" ? (
				<div className={styles.buttonWrapper}>
					<button>Return</button>
					<button>Succeeded</button>
				</div>
			) : (
				<div className={styles.buttonWrapper}>
					<i className="fa-solid fa-circle-check"></i>
				</div>
			)}
		</article>
	);
}
