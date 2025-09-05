import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";

export default function RegistrationWrapper() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const [form, setForm] = useState("register");

	function swapRegister() {
		setForm("register");
	}

	function swapLogin() {
		setForm("login");
	}

	return (
		<section
			className={
				theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
			}
		>
				<div>
					<button onClick={swapLogin}>Login</button>
					<button onClick={swapRegister}>Register</button>
				</div>
				<div>{form === "login" ? <Login /> : <Register />}</div>
		</section>
	);
}
