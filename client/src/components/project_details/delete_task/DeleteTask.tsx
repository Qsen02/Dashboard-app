import { useSelector } from "react-redux";
import styles from "../../logout/LogoutStyles.module.css";
import { RootState } from "../../../redux/state/store";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useDeleteTask } from "../../../hooks/useTasks";
import { ProjectOutletContext } from "../../../types/outlet_context";

export default function DeleteTask() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projectId, taskId } = useParams();
	const navigate = useNavigate();
	const deleteTask = useDeleteTask();
    const { setProjectHandler }=useOutletContext<ProjectOutletContext>()

	function onBack() {
		history.back();
	}

	async function onDelete() {
		try {
			const updatedProject = await deleteTask(taskId, projectId);
            setProjectHandler(updatedProject);
			navigate(`/projects/${projectId}`);
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
				<h2>Are you sure you want to delete this task?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete}>Yes</button>
					<button onClick={onBack}>No</button>
				</div>
			</section>
		</div>
	);
}
