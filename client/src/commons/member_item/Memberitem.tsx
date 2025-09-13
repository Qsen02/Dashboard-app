import { Link } from "react-router-dom";
import { Theme } from "../../types/user";
import styles from "./MemberItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";

interface MemberItemProp {
	id: string;
	profileImage: string | undefined;
	username: string;
	email: string;
	theme: Theme | null;
}

export default function MemberItem({
	id,
	profileImage,
	username,
	email,
	theme,
}: MemberItemProp) {
	return (
		<article
			className={`
				${theme === "light" ? "lightThemeSmoked" : "darkThemeLighter"}
                ${styles.wrapper}
			`}
		>
			<Link to={`/profile/${id}`}>
				<img src={profileImage} alt={username} onError={profileImageError}/>
			</Link>
			<h3>{username}</h3>
			<p>{email}</p>
		</article>
	);
}
