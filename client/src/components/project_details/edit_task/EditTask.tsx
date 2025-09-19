import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";
import CustomTextarea from "../../../commons/CustomTextarea";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { addTaskSchema } from "../../../schemas/schemas";
import styles from "./EditTaskStyles.module.css";
import { useEditTask, useGetOneTask } from "../../../hooks/useTasks";
import { ProjectOutletContext } from "../../../types/outlet_context";
import { useState } from "react";

export default function EditTask() {
	const { taskId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);
	const editTask = useEditTask();
	const { setProjectHandler } = useOutletContext<ProjectOutletContext>();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const { task, loading, error } = useGetOneTask(null, taskId);

	interface FormValuesType {
		title: string;
		description: string;
	}

	const formValues = {
		title: task?.title || "",
		description: task?.description || "",
	};

	function onBack() {
		history.back();
	}

	async function onEdit(
		values: FormValuesType,
		actions: FormikHelpers<FormValuesType>
	) {
		try {
			const title = values.title;
			const description = values.description;
			const updatedProject = await editTask(taskId, {
				title: title,
				description: description,
			});
			actions.resetForm();
			setProjectHandler(updatedProject);
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
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<h2>Server is not responding, please try again later!</h2>
			) : (
				<Formik
					initialValues={formValues}
					validationSchema={addTaskSchema}
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
							<h2>Edit task here</h2>
							{isErr ? <p className="error">{errMessage}</p> : ""}
							<div className="input">
								<CustomInput
									label="Title"
									type="text"
									value={formValues.title}
									name="title"
									id="title"
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
									value={formValues.title}
									name="description"
									id="description"
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
			)}
		</div>
	);
}
