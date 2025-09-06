import { Theme, UserForAuth } from "../types/user";

export function getUserData() {
	const user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user) as UserForAuth;
	}
	return null;
}

export function setUserData(data: object) {
	localStorage.setItem("user", JSON.stringify(data));
}

export function removeUserData() {
	localStorage.removeItem("user");
}

export function getThemeData() {
	const theme = localStorage.getItem("theme");
	if (theme) {
		return JSON.parse(theme) as Theme;
	}
	return null;
}

export function setThemeData(data: string) {
	localStorage.setItem("theme", JSON.stringify(data));
}

export function removeThemeData() {
	localStorage.removeItem("theme");
}
