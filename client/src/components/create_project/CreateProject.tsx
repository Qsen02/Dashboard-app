import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/CustomInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProjectSchema } from "../../schemas/schemas";
import { useCreateProject } from "../../hooks/useProjects";

export default function CreateProject() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const navigate = useNavigate();
	const createProject = useCreateProject();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");

	interface formValues {
		name: string;
	}

	const initValues = {
		name: "",
	};

	async function onCreate(
		values: formValues,
		actions: FormikHelpers<formValues>
	) {
		try {
			const name = values.name;
			await createProject({ name: name });
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

	return (
		<Formik
			initialValues={initValues}
			onSubmit={onCreate}
			validationSchema={createProjectSchema}
		>
			{(props) => (
				<Form className="form">
					<h3>Create your project here</h3>
					{isErr ? <p className="error">{errMessage}</p> : ""}
					<div className="input">
						<CustomInput
							label="Project name"
							type="text"
							value={initValues.name}
							name="name"
							className={
								theme === "light"
									? "lightThemeSmoked"
									: "darkThemeLighter"
							}
							id="name"
						/>
					</div>
					<button type="submit">Create</button>
				</Form>
			)}
		</Formik>
	);
}
