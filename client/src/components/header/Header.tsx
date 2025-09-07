import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import LinkItem from "../../commons/LinkItem";
import styles from "./HeaderStyles.module.css";
import { toggle } from "../../redux/state/theme_state/themeState";
import { useLogout } from "../../hooks/useUser";
import { removeUser } from "../../redux/state/user_state/userState";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const logout = useLogout();
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

	async function onLogout() {
		await logout();
		dispatch(removeUser());
        navigate("/registration");
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
			<i
				className="fa-solid fa-circle-half-stroke"
				onClick={changeTheme}
			></i>
			{user ? <button onClick={onLogout}>Logout</button> : ""}
		</header>
	);
}
