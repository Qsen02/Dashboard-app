import { Project } from "./project";

export type UserRole = "admin" | "user" | "programmer";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: UserRole;
	projects: Project[];
	profileImage?: string;
	created_at: string;
	updated_at: string;
}

export interface UserForAuth {
	_id: string;
	username: string;
	email: string;
	profileImage?: string;
	role: UserRole;
	accessToken: string;
}

export type Theme = "light" | "dark"