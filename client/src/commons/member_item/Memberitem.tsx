import { Link } from "react-router-dom";
import { Theme, User } from "../../types/user";
import styles from "./MemberItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";
import { useAddMember } from "../../hooks/useProjects";
import { useState } from "react";

interface MemberItemProp {
	id: string;
	profileImage: string | undefined;
	username: string;
	theme: Theme | null;
	flag: "Add" | "List";
	projectId?: string;
	members?: User[];
}

export default function MemberItem({
	id,
	profileImage,
	username,
	theme,
	flag,
	projectId,
	members,
}: MemberItemProp) {
	const addMember = useAddMember();
	const [added, setAdded] = useState(() => {
		if (members && members.map((el) => el._id).includes(id)) {
			return true;
		}
		return false;
	});

	async function onAddMember() {
		await addMember(id, projectId);
		setAdded(true);
	}

	return (
		<article
			className={`
				${theme === "light" ? "lightThemeSmoked" : "darkThemeLighter"}
                ${styles.wrapper}
			`}
		>
			<Link to={`/profile/${id}`}>
				<img
					src={profileImage}
					alt={username}
					onError={profileImageError}
				/>
			</Link>
			<h3>{username}</h3>
			{flag === "List" ? (
				<button>Remove</button>
			) : !added ? (
				<button onClick={onAddMember}>Add</button>
			) : (
				<div
					className={`${styles.messageWrapper} ${
						theme === "light"
							? "lightThemeSmoked"
							: "darkThemeLighter"
					}`}
				>
					<p>Added!</p>
				</div>
			)}
		</article>
	);
}
