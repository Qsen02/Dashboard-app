import { useParams } from "react-router-dom";
import styles from "./SuccessfullActionStyles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";

export default function SuccessfullAction() {
	const { username, flag } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);

	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}`}
			>
				{flag === "remove" ? (
					<h2>Successfully removed {username} from the project!</h2>
				) : flag === "add" ? (
					<h2>Successfully added {username} to the project!</h2>
				) : (
					""
				)}
				<button onClick={onBack}>OK</button>
			</section>
		</div>
	);
}
