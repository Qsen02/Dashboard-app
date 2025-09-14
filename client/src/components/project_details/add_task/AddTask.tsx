import { Form, Formik } from "formik";
import { useState } from "react";
import CustomInput from "../../../commons/CustomInput";
import CustomTextarea from "../../../commons/CustomTextarea";

export default function AddTask() {
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
	});

	function onBack() {
		history.back();
	}

    async function onAddTask(){

    }

	return (
		<div className="modal">
			<Formik initialValues={formValues} onSubmit={onAddTask}>
				{(props) => (
					<Form className={`form`}>
						<CustomInput
							label="Title"
							type="text"
							name="title"
							id="title"
							value={formValues.title}
						/>
						<CustomTextarea
							label="Description"
							type="text"
							name="description"
							id="description"
							value={formValues.description}
						/>
						<div>
							<button onClick={onBack}>Cancel</button>
							<button>Add</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
