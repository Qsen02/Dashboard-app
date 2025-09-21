import { useNavigate } from "react-router-dom";

export default function SuccessfullyChanged() {
	const navigate = useNavigate();

	function onBack() {
		navigate("/profile");
	}

	return (
		<div className="modal">
			<section>
				<h3>Password changed successfully!</h3>
				<button onClick={onBack}>OK</button>
			</section>
		</div>
	);
}
