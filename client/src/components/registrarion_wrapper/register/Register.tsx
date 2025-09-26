import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useState } from "react";
import { useRegister } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/state/user_state/userState";
import { registerSchema } from "../../../schemas/schemas";

export default function Register() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isRepassVisible, setIsRepassVisible] = useState(false);
	const register = useRegister();
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");

	interface formValues {
		username: string;
		email: string;
		profileImage: string;
		password: string;
		repass: string;
	}

	const initValues = {
		username: "",
		email: "",
		profileImage: "",
		password: "",
		repass: "",
	};

	async function onRegister(
		values: formValues,
		actions: FormikHelpers<formValues>
	) {
		try {
			const username = values.username;
			const email = values.email;
			const password = values.password;
			const repass = values.repass;
			const profileImage = values.profileImage;
			const user = await register({
				username: username,
				email: email,
				profileImage: profileImage,
				password: password,
				repass: repass,
			});
			dispatch(setUser(user));
			actions.resetForm();
			navigate("/");
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
			return;
		}
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
		<Formik
			initialValues={initValues}
			onSubmit={onRegister}
			validationSchema={registerSchema}
		>
			{() => (
				<Form className="form">
					<h3>You can create your account here</h3>
					{isErr ? <p className="error">{errMessage}</p> : ""}
					<div className="input">
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
					</div>
					<div className="input">
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
					</div>
					<div className="input">
						<CustomInput
							label="Profile image"
							type="text"
							value={initValues.profileImage}
							name="profileImage"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="profileImage"
						/>
					</div>
					<div className="input">
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
					</div>
					<div className="input">
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
					</div>
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}
