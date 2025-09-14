import { useSelector } from "react-redux";
import styles from "../../logout/LogoutStyles.module.css";
import { RootState } from "../../../redux/state/store";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import { deleteProject } from "../../../api/projectService";

export default function ProjectDelete() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projectId } = useParams();
	const { projectName } = useOutletContext<ProjectOutletContext>();
	const navigate = useNavigate();

	function onBack() {
		history.back();
	}

	async function onDelete() {
		try {
			await deleteProject(projectId);
			navigate("/");
		} catch (err) {
			navigate("404");
			return;
		}
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}`}
			>
				<h2>Are you sure you want to delete {projectName}?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete}>Yes</button>
					<button onClick={onBack}>No</button>
				</div>
			</section>
		</div>
	);
}
