import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";
import CustomTextarea from "../../../commons/CustomTextarea";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import { addTaskSchema } from "../../../schemas/schemas";
import styles from "./EditTaskStyles.module.css";

export default function EditTask() {
	const { projectId, taskId } = useParams();
	const { theme } = useSelector((state: RootState) => state.theme);

	interface FormValuesType {
		title: string;
		description: string;
	}

	const formValues = {
		title: "",
		description: "",
	};

    function onBack(){
        history.back();
    }

	async function onEdit() {}

	return (
		<div className="modal">
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
							<button onClick={onBack} type="button">Cancel</button>
							<button type="submit">Edit</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
