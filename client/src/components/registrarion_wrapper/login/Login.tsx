import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useState } from "react";
import { useLogin } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/state/user_state/userState";
import { loginSchema } from "../../../schemas/schemas";

export default function Register() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const login = useLogin();
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");

	interface formValues {
		username: string;
		password: string;
	}

	const initValues = {
		username: "",
		password: "",
	};

	async function onLogin(
		values: formValues,
		actions: FormikHelpers<formValues>
	) {
		try {
			const username = values.username;
			const password = values.password;
			const user = await login({
				username: username,
				password: password,
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

	return (
		<Formik
			initialValues={initValues}
			onSubmit={onLogin}
			validationSchema={loginSchema}
		>
			{(props) => (
				<Form className="form">
					<h3>You can login into your account here</h3>
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
							autoComplete="password"
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
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}
