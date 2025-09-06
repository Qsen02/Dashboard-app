import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useState } from "react";

export default function Register() {
	const { user } = useSelector((state: RootState) => state.user);
	const { theme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isRepassVisible, setIsRepassVisible] = useState(false);

	const initValues = {
		username: "",
		email: "",
		password: "",
		repass: "",
	};

	async function onRegister() {
		console.log("work!");
	}

	function showPassword() {
		if (isPasswordVisible) {
			setIsPasswordVisible(false);
		} else {
			setIsPasswordVisible(true);
		}
	}

	function showRepass() {
		if (isRepassVisible) {
			setIsRepassVisible(false);
		} else {
			setIsRepassVisible(true);
		}
	}

	return (
		<Formik initialValues={initValues} onSubmit={onRegister}>
			{(props) => (
				<Form className="form">
					<h3>You can create your account here</h3>
					<p className="input">
						<CustomInput
							label="Username"
							type="text"
							value={initValues.username}
							name="username"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="username"
							autoComplete="given-name"
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Email"
							type="text"
							value={initValues.email}
							name="email"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="email"
							autoComplete="email"
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Password"
							type={isPasswordVisible ? "text" : "password"}
							value={initValues.password}
							name="password"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="password"
						/>
						{isPasswordVisible ? (
							<i
								className={`fa-regular fa-eye ${
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}`}
								onClick={showPassword}
							></i>
						) : (
							<i
								className={`fa-regular fa-eye-slash ${
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}`}
								onClick={showPassword}
							></i>
						)}
					</p>
					<p className="input">
						<CustomInput
							label="Repeat password"
							type={isRepassVisible ? "text" : "password"}
							value={initValues.repass}
							name="repass"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="repass"
						/>
						{isRepassVisible ? (
							<i
								className={`fa-regular fa-eye ${
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}`}
								onClick={showRepass}
							></i>
						) : (
							<i
								className={`fa-regular fa-eye-slash ${
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}`}
								onClick={showRepass}
							></i>
						)}
					</p>
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}
