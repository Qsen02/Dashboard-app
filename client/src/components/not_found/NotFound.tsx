import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/state/store";
import styles from "../logout/LogoutStyles.module.css";

export default function NotFound() {
	const { theme } = useSelector((state: RootState) => state.theme);
	return (
		<section
			className={`${styles.wrapper} ${
				theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
			}`}
		>
			<h2>404 page not found!</h2>
			<p>
				Please, return to <Link to="/">Home</Link>
			</p>
		</section>
	);
}
