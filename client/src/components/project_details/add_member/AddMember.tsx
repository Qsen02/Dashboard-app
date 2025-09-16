import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/state/store";
import styles from "./AddMemberStyles.module.css";
import { useGetLatestUsers, useSearchUsers } from "../../../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { ProjectOutletContext } from "../../../types/outlet_context";
import MemberItem from "../../../commons/member_item/Memberitem";
import { useState } from "react";

export default function AddMember() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { users, setUsers, loading, setLoading, error, setError } =
		useGetLatestUsers([]);
	const { members, owner } = useOutletContext<ProjectOutletContext>();
	const searchUsers = useSearchUsers();
	const [isSearched, setIsSearched] = useState(false);

	const formValues = {
		query: "",
	};

	async function onSearch(values: { query: string }) {
		try {
			setLoading(true);
			let query = values.query;
			if (query === "") {
				query = "No value";
			}
			const newUsers = await searchUsers(query);
			setUsers(newUsers);
			setIsSearched(true);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
			return;
		}
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
				<Formik initialValues={formValues} onSubmit={onSearch}>
					{(props) => (
						<Form className="form">
							<h2>Search users</h2>
							<div className={`input ${styles.inputWrapper}`}>
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
				{loading && !error ? (
					<span className="loader"></span>
				) : error ? (
					<h2>Server is not responding, please try again later!</h2>
				) : (
					<section className={styles.memberWrapper}>
						{members && owner && users.length > 0 ? (
							users
								.filter(
									(el) =>
										!members
											.map((element) => element._id)
											.includes(el._id) &&
										owner._id !== el._id
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
						) : !isSearched ? (
							<h2>No users yet</h2>
						) : (
							<h2>No results!</h2>
						)}
					</section>
				)}
			</section>
		</div>
	);
}
