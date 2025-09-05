import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import styles from "./registrationWrapperStyles.module.css";

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
			className={`
				${theme === "light" ? "lightThemeNormal" : "darkThemeNormal"} ${styles.wrapper}
            `}
		>
			<div className={styles.buttonSection}>
				<button
					onClick={swapLogin}
					className={form === "login" ? styles.selected : styles.notSelected}
				>
					Login
				</button>
				<button
					onClick={swapRegister}
					className={form === "register" ? styles.selected : styles.notSelected}
				>
					Register
				</button>
			</div>
			<div>{form === "login" ? <Login /> : <Register />}</div>
		</section>
	);
}
