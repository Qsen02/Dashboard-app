import { Project } from "../types/project";
import { User, UserForAuth } from "../types/user";
import { get, post, put } from "./requester";

const endpoint = "/users";

export async function logout() {
	return await get(`${endpoint}/logout`);
}

export async function login(data: object) {
	const user = await post(`${endpoint}/login`, data);
	return user as UserForAuth;
}

export async function register(data: object) {
	const user = await post(`${endpoint}/register`, data);
	return user as UserForAuth;
}

export async function getUserById(userId: string) {
	const user = await get(`${endpoint}/${userId}`);
	return user as User;
}

export async function searchUsers(query: string) {
	const users = await get(`${endpoint}/search/${query}`);
	return users as User[];
}

export async function paginateUsers(page: Number, isSearched: boolean) {
	const users = await get(
		`${endpoint}/page/${page}/isSearched/${isSearched}`
	);
	return users as User[];
}

export async function getLatestUsers() {
	const users = await get(`${endpoint}/latest`);
	return users as User[];
}

export async function getUserProjects(userId: string) {
	const projects = await get(`${endpoint}/${userId}/projects`);
	return projects as Project[];
}

export async function changeUserRole(userId: string, role: User["role"]) {
	const updatedUser = await put(
		`${endpoint}/${userId}/change-role/${role}`,
		{}
	);
	return updatedUser as User;
}

export async function editUser(userId: string, data: object) {
	const updatedUser = await put(`${endpoint}/${userId}/edit`, data);
	return updatedUser as User;
}

export async function changePassword(userId: string, data: object) {
	const updatedUser = await put(
		`${endpoint}/${userId}/change-password`,
		data
	);
	return updatedUser as User;
}
