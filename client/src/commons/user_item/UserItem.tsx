import { Link } from "react-router-dom";
import { Theme, UserRole } from "../../types/user";
import { profileImageError } from "../../utils/imageErrors";
import styles from "./UserItemStyles.module.css";

interface UserItemProps {
	id: string;
	profileImage: string | undefined;
	username: string;
	theme: Theme | null;
	role: UserRole;
}

export default function UserItem({
	id,
	profileImage,
	username,
	role,
	theme,
}: UserItemProps) {
	return (
		<article
			className={`
        ${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
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
			<h2>{username}</h2>
			<h2>Role: {role}</h2>
			{role === "user" ? (
				<button>Make Admin</button>
			) : (
				<button>Remove Admin</button>
			)}
		</article>
	);
}
