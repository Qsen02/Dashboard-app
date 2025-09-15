import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";

export default function AddMember() {
	const { theme } = useSelector((state: RootState) => state.theme);

	const formValues = {
		query: "",
	};

	async function onSearch() {
		console.log("Searched!");
	}

	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<section>
				<button onClick={onBack}>X</button>
				<Formik initialValues={formValues} onSubmit={onSearch}>
					{(props) => (
						<Form>
							<h2>Search users</h2>
							<div className="input">
								<CustomInput
									type="text"
									name="query"
									id="query"
									placeholder="Search users..."
									value={formValues.query}
									className={
										theme === "light"
											? "lightThemeSmoked"
											: "darkThemeLighter"
									}
								/>
							</div>
							<button type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</Form>
					)}
				</Formik>
				<h3>User list</h3>
				<section></section>
			</section>
		</div>
	);
}
