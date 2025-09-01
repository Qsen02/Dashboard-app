import { Project } from "./project";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: "admin" | "user" | "programmer";
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
	role: "admin" | "user" | "programmer";
	accessToken: string;
}

export type Theme = "light" | "dark"