import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { profileImageError } from "../../utils/imageErrors";
import styles from "./ProfileStyles.module.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function Profile() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();

	function navigateToEdit() {
		navigate("/profile/edit");
	}

	function navigateToChangePassword() {
		navigate("/profile/change-password");
	}

	return (
		<>
			<Outlet context={{ curUser: user }} />
			<section
				className={`
				${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"}
                ${styles.wrapper}
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
					</div>
				</section>
				<div className={styles.buttonWrapper}>
					<button onClick={navigateToChangePassword}>
						Change password
					</button>
					<button onClick={navigateToEdit}>Edit profile</button>
				</div>
			</section>
		</>
	);
}
