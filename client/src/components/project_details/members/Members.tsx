import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/state/store";
import { useGetProjectMembers } from "../../../hooks/useProjects";
import MemberItem from "../../../commons/member_item/Memberitem";
import styles from "./MembersStyles.module.css";

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
				className={`
					${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
                    ${styles.wrapper}
				`}
			>
				<button onClick={onBack}>X</button>
				<h2>List of members</h2>
				<section className={styles.membersWrapper}>
					{loading && !error ? (
						<span className="loader"></span>
					) : error ? (
						<p>Server is not responding, please try again later!</p>
					) : members.length === 0 ? (
						<p>No members yet.</p>
					) : (
						members.map((el) => (
							<MemberItem
								key={el._id}
								id={el._id}
								profileImage={el.profileImage}
								username={el.username}
                                theme={theme}
								flag="List"
								members={members}
							/>
						))
					)}
				</section>
			</section>
		</div>
	);
}
