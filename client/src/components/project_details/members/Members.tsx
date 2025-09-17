import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { RootState } from "../../../redux/state/store";
import MemberItem from "../../../commons/member_item/Memberitem";
import styles from "./MembersStyles.module.css";
import { ProjectOutletContext } from "../../../types/outlet_context";

export default function Members() {
	const { projectId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);
	const { setProjectHandler, members } =
		useOutletContext<ProjectOutletContext>();

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
					{members && members.length === 0 ? (
						<p>No members yet.</p>
					) : (
						members?.map((el) => (
							<MemberItem
								key={el._id}
								id={el._id}
								profileImage={el.profileImage}
								username={el.username}
								theme={theme}
								projectId={projectId}
								flag="List"
								setProjectHandler={setProjectHandler}
							/>
						))
					)}
				</section>
			</section>
		</div>
	);
}
