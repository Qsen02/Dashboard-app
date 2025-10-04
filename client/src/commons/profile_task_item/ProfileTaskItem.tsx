import { useNavigate } from "react-router-dom";
import { TaskStatus } from "../../types/task";

interface ProfileTaskItemProps {
	id: string;
	title: string;
	status: TaskStatus;
}

export default function ProfileTaskItem({
	id,
	title,
	status,
}: ProfileTaskItemProps) {
	const navigate = useNavigate();

	function goToTaskDetails() {
		try {
			navigate(`/profile/task/${id}`);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article>
			<h3>{title}</h3>
			<p>Status: {status}</p>
			<button onClick={goToTaskDetails}>Details</button>
		</article>
	);
}
