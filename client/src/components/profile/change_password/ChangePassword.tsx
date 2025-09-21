import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { changePasswordSchema, loginSchema } from "../../../schemas/schemas";
import { ProfileOutletContext } from "../../../types/outlet_context";
import { useChangePassword } from "../../../hooks/useUser";

export default function ChangePassword() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { curUser } = useOutletContext<ProfileOutletContext>();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const changePassword = useChangePassword();

	interface formValues {
		newPassword: string;
	}

	const initValues = {
		newPassword: "",
	};

	async function onChangePassword(
		values: formValues,
		actions: FormikHelpers<formValues>
	) {
		try {
			const newPassword = values.newPassword;
			await changePassword(curUser?._id, {
				newPassword: newPassword,
			});
			actions.resetForm();
			navigate("/profile/successfully-changed");
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

	function onBack() {
		navigate("/profile");
	}

	return (
		<div className="modal">
			<Formik
				initialValues={initValues}
				onSubmit={onChangePassword}
				validationSchema={changePasswordSchema}
			>
				{(props) => (
					<Form className="form">
						<h3>Change your password here</h3>
						{isErr ? <p className="error">{errMessage}</p> : ""}
						<div className="input">
							<CustomInput
								label="New password"
								type={isPasswordVisible ? "text" : "password"}
								value={initValues.newPassword}
								name="newPassword"
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
								id="newPassword"
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
						<div>
							<button onClick={onBack} type="button">
								Cancel
							</button>
							<button type="submit">Submit</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
