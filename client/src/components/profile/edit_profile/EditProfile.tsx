import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { editProfileSchema } from "../../../schemas/schemas";
import styles from "../../project_details/edit_task/EditTaskStyles.module.css";
import { ProfileOutletContext } from "../../../types/outlet_context";
import { useState } from "react";
import { useEditProfile } from "../../../hooks/useUser";
import { setUser } from "../../../redux/state/user_state/userState";

export default function EditProfile() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { curUser } = useOutletContext<ProfileOutletContext>();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const dispatch = useDispatch();
	const editProfile = useEditProfile();

	interface FormValuesType {
		username: string;
		email: string;
		profileImage: string;
	}

	const formValues = {
		username: curUser?.username || "",
		email: curUser?.email || "",
		profileImage: curUser?.profileImage || "",
	};

	function onBack() {
		history.back();
	}

	async function onEdit(
		values: FormValuesType,
		actions: FormikHelpers<FormValuesType>
	) {
		try {
			const username = values.username;
			const email = values.email;
			const profileImage = values.profileImage;
			await editProfile(curUser?._id, {
				username: username,
				email: email,
				profileImage: profileImage,
			});
			actions.resetForm();
			if (curUser) {
				const updatedUser = {
					...curUser,
					username,
					email,
					profileImage,
				};
				dispatch(setUser(updatedUser));
			}
			history.back();
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

	return (
		<div className="modal">
			<Formik
				initialValues={formValues}
				validationSchema={editProfileSchema}
				onSubmit={onEdit}
			>
				{(props) => (
					<Form
						className={`form ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						} ${styles.formWrapper}`}
					>
						<h2>Edit your profile here</h2>
						{isErr ? <p className="error">{errMessage}</p> : ""}
						<div className="input">
							<CustomInput
								label="Username"
								type="text"
								value={formValues.username}
								name="username"
								id="username"
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className="input">
							<CustomInput
								label="Email"
								type="text"
								value={formValues.email}
								name="email"
								id="email"
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className="input">
							<CustomInput
								label="Profile image"
								type="text"
								value={formValues.profileImage}
								name="profileImage"
								id="profileImage"
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className={styles.buttonWrapper}>
							<button onClick={onBack} type="button">
								Cancel
							</button>
							<button type="submit">Edit</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
