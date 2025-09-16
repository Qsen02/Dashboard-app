import { Link } from "react-router-dom";
import { Theme } from "../../types/user";
import styles from "./MemberItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";

interface MemberItemProp {
	id: string;
	profileImage: string | undefined;
	username: string;
	theme: Theme | null;
	flag: "Add" | "List";
}

export default function MemberItem({
	id,
	profileImage,
	username,
	theme,
	flag,
}: MemberItemProp) {
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
			{flag === "List" ? <button>Remove</button> : <button>Add</button>}
		</article>
	);
}
