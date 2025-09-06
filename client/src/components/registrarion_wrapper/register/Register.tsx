import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";

export default function Register() {
	const { user } = useSelector((state: RootState) => state.user);
	const { theme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();
	const initValues = {
		username: "",
		email: "",
		password: "",
		repass: "",
	};

	async function onRegister() {
		console.log("work!");
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
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Password"
							type="password"
							value={initValues.password}
							name="password"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Repeat password"
							type="password"
							value={initValues.repass}
							name="repass"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
						/>
					</p>
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}
