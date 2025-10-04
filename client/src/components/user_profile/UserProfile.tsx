import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { profileImageError } from "../../utils/imageErrors";
import styles from "../profile/ProfileStyles.module.css";
import { useGetOneUser } from "../../hooks/useUser";
import { useParams } from "react-router-dom";

export default function UserProfile() {
	const { userId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);
	const { user, loading, error } = useGetOneUser(null, userId);

	return (
		<>
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<div
					className={`errorMessage ${
						theme === "light"
							? "lightThemeNormal"
							: "darkThemeNormal"
					}`}
				>
					<h2>Server is not responding, please try again later!</h2>
				</div>
			) : (
				<section
					className={`
				${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
                ${styles.profileWrapper}
			`}
				>
					<section className={styles.headerWrapper}>
						<img
							src={user?.profileImage}
							alt={user?.username}
							onError={profileImageError}
						/>
						<div className={styles.headerInfo}>
							<h2>{user?.username}</h2>
							<p>{user?.email}</p>
							<p>Projects count: {user?.projects.length}</p>
						</div>
					</section>
				</section>
			)}
		</>
	);
}
