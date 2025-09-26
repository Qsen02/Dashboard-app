import {
	getUserData,
	removeThemeData,
	removeUserData,
} from "../utils/userHelper";

const host = import.meta.env.BACKEND_URL || "http://localhost:3000";

async function requester(method: string, url: string, data?: object) {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	const options: RequestInit = {
		method: method,
		headers: headers,
	};

	const user = getUserData();
	if (user) {
		headers["X-Authorization"] = user.accessToken;
	}

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const res = await fetch(url, options);
		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				removeUserData();
				removeThemeData();
			}
			const err = await res.json();
			throw new Error(err.message);
		}
		const data = await res.json();
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}

export async function get(url: string) {
	return await requester("get", `${host}/${url}`);
}

export async function post(url: string, data: object) {
	return await requester("post", `${host}/${url}`, data);
}

export async function put(url: string, data: object) {
	return await requester("put", `${host}/${url}`, data);
}

export async function del(url: string) {
	return await requester("delete", `${host}/${url}`);
}
