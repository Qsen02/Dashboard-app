import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/state/store";

export default function Members() {
	const { projectId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);
	return (
		<div className="modal">
			<section
				className={
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}
			>
				<h2>Works!</h2>
			</section>
		</div>
	);
}
