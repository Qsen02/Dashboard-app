import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useUser";
import { removeUser } from "../../redux/state/user_state/userState";
import styles from "./LogoutStyles.module.css";
import { RootState } from "../../redux/state/store";

export default function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = useLogout();
	const { theme } = useSelector((state: RootState) => state.theme);

	function onCancel() {
		history.back();
	}

	async function onLogout() {
		await logout();
		dispatch(removeUser());
		navigate("/registration");
	}

	return (
		<section
			className={`${styles.wrapper} ${
				theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
			}`}
		>
			<h2>Are you sure you want to logout?</h2>
			<div className={styles.buttons}>
				<button onClick={onLogout}>Yes</button>
				<button onClick={onCancel}>No</button>
			</div>
		</section>
	);
}
