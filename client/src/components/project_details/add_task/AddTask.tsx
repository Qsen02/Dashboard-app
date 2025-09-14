import { Form, Formik } from "formik";
import { useState } from "react";
import CustomInput from "../../../commons/CustomInput";
import CustomTextarea from "../../../commons/CustomTextarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { useOutletContext, useParams } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import styles from "./AddTaskStyles.module.css";

export default function AddTask() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { projectId } = useParams();
	const { setProjectHandler } = useOutletContext<ProjectOutletContext>();
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
	});

	function onBack() {
		history.back();
	}

	async function onAddTask() {}

	return (
		<div className="modal">
			<Formik initialValues={formValues} onSubmit={onAddTask}>
				{(props) => (
					<Form
						className={`form ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						} ${styles.wrapper}`}
					>
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
