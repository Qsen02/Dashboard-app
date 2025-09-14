import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import CustomInput from "../../../commons/CustomInput";
import CustomTextarea from "../../../commons/CustomTextarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import styles from "./AddTaskStyles.module.css";
import { useAddTask } from "../../../hooks/useProjects";
import { addTaskSchema } from "../../../schemas/schemas";

export default function AddTask() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projectId } = useParams();
	const { setProjectHandler } = useOutletContext<ProjectOutletContext>();
	const addTaskToPriject = useAddTask();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
    const navigate=useNavigate();
	const formValues = {
		title: "",
		description: "",
	};

	interface FormValuesProps {
		title: string;
		description: string;
	}

	function onBack() {
		history.back();
	}

	async function onAddTask(
		values: FormValuesProps,
		actions: FormikHelpers<FormValuesProps>
	) {
		try {
			const title = values.title;
			const description = values.description;
			const updatedProject = await addTaskToPriject(projectId, {
				title: title,
				description: description,
			});
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

	return (
		<div className="modal">
			<Formik
				initialValues={formValues}
				onSubmit={onAddTask}
				validationSchema={addTaskSchema}
			>
				{(props) => (
					<Form
						className={`form ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						} ${styles.wrapper}`}
					>
						<h2>Add new task</h2>
						{isErr ? <p className="error">{errMessage}</p> : ""}
						<div className="input">
							<CustomInput
								label="Title"
								type="text"
								name="title"
								id="title"
								value={formValues.title}
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className="input">
							<CustomTextarea
								label="Description"
								type="text"
								name="description"
								id="description"
								value={formValues.description}
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
						</div>
						<div className={styles.buttons}>
							<button onClick={onBack}>Cancel</button>
							<button>Add</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
