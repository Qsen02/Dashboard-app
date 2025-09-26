import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import { useState } from "react";
import styles from "../add_task/AddTaskStyles.module.css";
import CustomInput from "../../../commons/CustomInput";
import { createProjectSchema } from "../../../schemas/schemas";
import { useEditProject } from "../../../hooks/useProjects";

export default function ProjectEdit() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projectId } = useParams();
	const { setProjectHandler, projectName } =
		useOutletContext<ProjectOutletContext>();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const navigate = useNavigate();
	const editProject = useEditProject();
	const formValues = {
		name: projectName || "",
	};

	async function onEdit(
		values: { name: string },
		actions: FormikHelpers<{ name: string }>
	) {
		try {
			const name = values.name;
			const updatedProject = await editProject(projectId, { name: name });
			actions.resetForm();
			setProjectHandler(updatedProject);
			navigate(`/projects/${projectId}`);
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

	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<Formik
				initialValues={formValues}
				onSubmit={onEdit}
				validationSchema={createProjectSchema}
			>
				{() => (
					<Form
						className={`form ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						} ${styles.wrapper}`}
					>
						<h2>Edit project name</h2>
						{isErr ? <p className="error">{errMessage}</p> : ""}
						<div className="input">
							<CustomInput
								label="Project name"
								type="text"
								name="name"
								id="name"
								value={formValues.name}
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className={styles.buttons}>
							<button type="button" onClick={onBack}>
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
