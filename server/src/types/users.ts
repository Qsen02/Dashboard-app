import { Project } from "./projects";

export interface User {
	_id:string;
	username: string;
	email: string;
	password: string;
	role: "admin" | "user" | "programmer";
    projects:Project[];
	profileImage?: string;
}

export interface UserPayload {
	_id: string;
	email: string;
	username: string;
	role: "admin" | "user" | "programmer";
	profileImage?: string;
}

