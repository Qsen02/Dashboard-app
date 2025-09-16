import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import styles from "./AddMemberStyles.module.css";
import { useGetLatestUsers } from "../../../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import MemberItem from "../../../commons/member_item/Memberitem";

export default function AddMember() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { users, setUsers, loading, error } = useGetLatestUsers([]);
	const { members, owner } = useOutletContext<ProjectOutletContext>();

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
			<section
				className={`${styles.wrapper} ${
					theme === "light" ? "lightThemeNormal" : "darkThemeNormal"
				}`}
			>
				<button onClick={onBack}>X</button>
				{loading && !error ? (
					<span className="loader"></span>
				) : error ? (
					<h2>Server is not responding, please try again later!</h2>
				) : (
					<>
						<Formik initialValues={formValues} onSubmit={onSearch}>
							{(props) => (
								<Form className="form">
									<h2>Search users</h2>
									<div
										className={`input ${styles.inputWrapper}`}
									>
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
										<button type="submit">
											<i className="fa-solid fa-magnifying-glass"></i>
										</button>
									</div>
								</Form>
							)}
						</Formik>
						<h3>User list</h3>
						<section className={styles.memberWrapper}>
							{members && owner && users.length > 0 ? (
								users
									.filter(
										(el) =>
											!members
												.map((element) => element._id)
												.includes(el._id)
											&& owner._id !== el._id
									)
									.map((el) => (
										<MemberItem
											key={el._id}
											id={el._id}
											profileImage={el.profileImage}
											username={el.username}
											theme={theme}
											flag="Add"
										/>
									))
							) : (
								<h2>No users yet</h2>
							)}
						</section>
					</>
				)}
			</section>
		</div>
	);
}
