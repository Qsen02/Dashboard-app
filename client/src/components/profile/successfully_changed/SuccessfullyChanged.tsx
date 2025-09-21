import { useNavigate } from "react-router-dom";
import styles from "../../../commons/successfull_action/SuccessfullActionStyles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";

export default function SuccessfullyChanged() {
	const navigate = useNavigate();
	const { theme } = useSelector((state: RootState) => state.theme);

	function onBack() {
		navigate("/profile");
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}`}
			>
				<h2>Password changed successfully!</h2>
				<button onClick={onBack}>OK</button>
			</section>
		</div>
	);
}
