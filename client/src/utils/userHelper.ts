export function getUserData() {
	const user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user);
	}
	return null;
}

export function setUserData(data: Object) {
	localStorage.setItem("user", JSON.stringify(data));
}

export function removeUserData() {
	localStorage.removeItem("user");
}

export function getThemeData() {
	const theme = localStorage.getItem("theme");
	if (theme) {
		return JSON.parse(theme);
	}
	return null;
}

export function setThemeData(data: Object) {
	localStorage.setItem("theme", JSON.stringify(data));
}

export function removeThemeData() {
	localStorage.removeItem("theme");
}
