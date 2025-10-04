import { useNavigate } from "react-router-dom";
import { TaskStatus } from "../../types/task";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import styles from "./ProfileTaskItemStyles.module.css";
import { addDots } from "../../utils/textTransform";

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
	const { theme } = useSelector((state: RootState) => state.theme);
	const navigate = useNavigate();

	function goToTaskDetails() {
		try {
			navigate(`/profile/task/${id}`);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article
			className={`${styles.wrapper} ${
				theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
			}`}
		>
			<i className="fa-solid fa-thumbtack"></i>
			<h3>{title.length > 20 ? addDots(title) : title}</h3>
			<p>Status: {status}</p>
			<button onClick={goToTaskDetails}>Details</button>
		</article>
	);
}
