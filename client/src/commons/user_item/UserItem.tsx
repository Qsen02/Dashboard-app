import { Link, useNavigate } from "react-router-dom";
import { Theme, UserRole } from "../../types/user";
import { profileImageError } from "../../utils/imageErrors";
import styles from "./UserItemStyles.module.css";
import { useChangeRole } from "../../hooks/useUser";
import { useState } from "react";

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
	const changeRole = useChangeRole();
	const navigate = useNavigate();
	const [curRole, setCurRole] = useState<UserRole>(role);

	async function onChangeRole(role: "user" | "admin") {
		try {
			await changeRole(id, { role });
			setCurRole(role);
		} catch (err) {
			navigate("404");
		}
	}

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
			<h2>Role: {curRole}</h2>
			{curRole === "user" ? (
				<button onClick={() => onChangeRole("admin")}>
					Make Admin
				</button>
			) : (
				<button onClick={() => onChangeRole("user")}>
					Remove Admin
				</button>
			)}
		</article>
	);
}
