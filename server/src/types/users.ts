import { Project } from "./projects";

export interface User {
	_id:string;
	username: string;
	email: string;
	password: string;
	role: "admin" | "user" | "programmer";
    projects?:Project[];
}

export interface UserPayload {
	_id: string;
	email: string;
	username: string;
	role: "admin" | "user" | "programmer";
}
