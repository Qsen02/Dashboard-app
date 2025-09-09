import { Link } from "react-router-dom";
import { Theme } from "../../types/user";
import styles from "./ProjectItemStyles.module.css";
import { addDots } from "../../utils/textTransform";

interface ProjectItemProps {
	id: string;
	name: string;
	membersCount: number;
	tasksCount: number;
	theme: Theme | null;
}

export default function ProjectItem({
	id,
	name,
	membersCount,
	tasksCount,
	theme,
}: ProjectItemProps) {
	return (
		<Link to={`/projects/${id}`}>
			<article
				className={`${
					theme === "light" ? "lightThemeSmoked" : "darkThemeLighter"
				} ${styles.wrapper}`}
			>
				<h2>{name.length > 20 ? addDots(name) : name}</h2>
				<div className={styles.textWrapper}>
					<p>Tasks: {tasksCount}</p>
					<p>Members: {membersCount}</p>
				</div>
			</article>
		</Link>
	);
}
