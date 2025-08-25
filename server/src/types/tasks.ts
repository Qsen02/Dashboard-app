import { Project } from "./projects";
import { User } from "./users";

export interface Task {
	_id:string;
	title: string;
	description: string;
	status: "pending" | "in-progress" | "completed";
	ownerId: User;
	projectId: Project;
}
