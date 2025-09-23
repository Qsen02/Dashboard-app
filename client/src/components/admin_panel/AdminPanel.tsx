import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/CustomInput";
import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import styles from "./AdminPanelStyles.module.css";
import {
	usePaginateUsers,
	usePagination,
	useSearchUsers,
} from "../../hooks/useUser";
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
		setMaxPage,
		curPage,
		setCurPage,
		isSearched,
		setIsSearched,
	} = usePaginateUsers([]);
	const searchUsers = useSearchUsers();
	const pagination = usePagination();

	const formValues = {
		query: "",
	};

	function setFirstPage() {
		setCurPage(1);
	}

	function setLastPage() {
		setCurPage(maxPage);
	}

	function setPrevPage() {
		if (curPage > 1) {
			setCurPage((value) => value - 1);
		}
	}

	function setNextPage() {
		if (curPage < maxPage) {
			setCurPage((value) => value + 1);
		}
	}

	async function onSearch(values: typeof formValues) {
		try {
			setLoading(true);
			setIsSearched(true);
			let query = values.query.trim();
			if (query === "") {
				query = "No value";
			}
			await searchUsers(query);
			const { users: searchedUsers, maxPages } = await pagination(
				1,
				true
			);
			setUsers(searchedUsers);
			setMaxPage(maxPages);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
			return;
		}
	}

	return (
		<section className={styles.wrapper}>
			<h1>Admin Panel</h1>
			<Formik initialValues={formValues} onSubmit={onSearch}>
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
					<div
						className={`errorMessage ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						}`}
					>
						<h2>
							Server is not responding, please try again later!
						</h2>
					</div>
				) : users.length === 0 && !isSearched ? (
					<div
						className={`errorMessage ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						}`}
					>
						<h2>No users yet!</h2>
					</div>
				) : isSearched && users.length === 0 ? (
					<div
						className={`errorMessage ${
							theme === "light"
								? "lightThemeNormal"
								: "darkThemeNormal"
						}`}
					>
						<h2>No users found!</h2>
					</div>
				) : (
					users
						.filter((el) => el.role !== "programmer")
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
			{!loading && !error && users.length > 0 ? (
				<section
					className={`${styles.pagination} ${
						theme === "light"
							? "lightThemeNormal"
							: "darkThemeNormal"
					}`}
				>
					<button onClick={setFirstPage}>
						<i className="fa-solid fa-angles-left"></i>
					</button>
					<button onClick={setPrevPage}>
						<i className="fa-solid fa-angle-left"></i>
					</button>
					<p>
						{curPage} of {maxPage}
					</p>
					<button onClick={setNextPage}>
						<i className="fa-solid fa-angle-right"></i>
					</button>
					<button onClick={setLastPage}>
						<i className="fa-solid fa-angles-right"></i>
					</button>
				</section>
			) : (
				""
			)}
		</section>
	);
}
