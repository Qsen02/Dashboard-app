import { Form, Formik } from "formik";
import CustomInput from "../../commons/CustomInput";
import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import styles from "./AdminPanelStyles.module.css";

export default function AdminPanel() {
	const { theme } = useSelector((state: RootState) => state.theme);

	const formValues = {
		query: "",
	};

	return (
		<section className={styles.wrapper}>
			<h1>Admin Panel</h1>
			<Formik
				initialValues={formValues}
				onSubmit={(values) => console.log(values)}
			>
				{(props) => (
					<Form className="form">
						<div className={`input ${styles.inputWrapper}`}>
							<CustomInput
								placeholder="Search users..."
								type="text"
								value={formValues.query}
								name="query"
								id="query"
								className={
									theme === "light"
										? "lightThemeSmoked"
										: "darkThemeLighter"
								}
							/>
							<button type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<section></section>
		</section>
	);
}
