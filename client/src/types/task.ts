import { Project } from "./project";
import { User } from "./user";

export interface Task {
	_id: string;
	title: string;
	description: string;
	appliedBy?: User;
	status: "pending" | "in-progress" | "completed";
	projectId: Project;
	ownerId: User;
}
