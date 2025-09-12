import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/state/store";
import { useGetProjectMembers } from "../../../hooks/useProjects";

export default function Members() {
	const { projectId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);
	const { members, loading, error } = useGetProjectMembers([], projectId);

	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<section
				className={
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}
			>
				<button onClick={onBack}>X</button>
				<h2>List of members</h2>
				<section>
					{loading && !error ? (
						<span className="loader"></span>
					) : error ? (
						<p>Server is not responding, please try again later!</p>
					) : members.length === 0 ? (
						<p>No members yet.</p>
					) : (
						members.map((el) => <p key={el._id}>{el.username}</p>)
					)}
				</section>
			</section>
		</div>
	);
}
