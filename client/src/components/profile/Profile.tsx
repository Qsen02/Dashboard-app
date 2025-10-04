import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { profileImageError } from "../../utils/imageErrors";
import styles from "./ProfileStyles.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserTasks } from "../../hooks/useUser";
import ProfileTaskItem from "../../commons/profile_task_item/ProfileTaskItem";

export default function Profile() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { user } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const { tasks, loading, error } = useGetUserTasks([]);

	function navigateToEdit() {
		navigate("/profile/edit");
	}

	function navigateToChangePassword() {
		navigate("/profile/change-password");
	}

	return (
		<>
			<Outlet context={{ curUser: user }} />
			<section className={styles.wrapper}>
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
						</div>
					</section>
					<div className={styles.buttonWrapper}>
						<button onClick={navigateToChangePassword}>
							Change password
						</button>
						<button onClick={navigateToEdit}>Edit profile</button>
					</div>
				</section>
				<h2>Your applied tasks</h2>
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
						<h3>
							Server is not responding, please try again later
						</h3>
					</div>
				) : tasks.length === 0 ? (
					<div
						className={`errorMessage ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						}`}
					>
						<h3>No tasks yet</h3>
					</div>
				) : (
					<section>
						{tasks.map((el) => (
							<ProfileTaskItem
								key={el._id}
								id={el._id}
								title={el.title}
								status={el.status}
							/>
						))}
					</section>
				)}
			</section>
		</>
	);
}
