import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import LinkItem from "../../commons/LinkItem";
import styles from "./HeaderStyles.module.css";
import { toggle } from "../../redux/state/theme_state/themeState";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
    const navigate=useNavigate();

	const userNav = [
		{ name: "Home", link: "/" },
		{ name: "Profile", link: "/profile" },
	];
	const programmerNav = [
		{ name: "Home", link: "/" },
		{ name: "Profile", link: "/profile" },
		{ name: "Admins", link: "/admins" },
	];

	function changeTheme() {
		dispatch(toggle());
	}

	async function openLogoutModal() {
		navigate("/logout");
	}

	return (
		<header className={styles.wrapper}>
			<ul>
				{user?.role === "user" || user?.role === "admin"
					? userNav.map((el) => (
							<LinkItem
								key={el.name}
								name={el.name}
								link={el.link}
							/>
					  ))
					: user
					? programmerNav.map((el) => (
							<LinkItem
								key={el.name}
								name={el.name}
								link={el.link}
							/>
					  ))
					: ""}
			</ul>
			<p>Hello, {user?.username}</p>
			<i
				className="fa-solid fa-circle-half-stroke"
				onClick={changeTheme}
			></i>
			{user ? <button onClick={openLogoutModal}>Logout</button> : ""}
		</header>
	);
}
