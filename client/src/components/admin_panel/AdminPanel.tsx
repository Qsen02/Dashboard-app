import { Form, Formik } from "formik";
import CustomInput from "../../commons/CustomInput";
import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import styles from "./AdminPanelStyles.module.css";
import { usePaginateUsers } from "../../hooks/useUser";
import UserItem from "../../commons/user_item/UserItem";

export default function AdminPanel() {
	const { theme } = useSelector((state: RootState) => state.theme);
	const {
		users,
		setUsers,
		loading,
		setLoading,
		error,
		setError,
		maxPage,
		isSearched,
		setIsSearched,
	} = usePaginateUsers([]);

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
			<section className={styles.userWrapper}>
				{loading && !error ? (
					<span className="loader"></span>
				) : error ? (
					<div className="errorMessage">
						<h2>
							Server is not responding, please try again later!
						</h2>
					</div>
				) : users.length === 0 ? (
					<div className="errorMessage">
						<h2>No users yet!</h2>
					</div>
				) : (
					users
						.map((el) => (
							<UserItem
								key={el._id}
								id={el._id}
								profileImage={el.profileImage}
								username={el.username}
								role={el.role}
								theme={theme}
							/>
						))
				)}
			</section>
            <section>
                <button></button>
            </section>
		</section>
	);
}
