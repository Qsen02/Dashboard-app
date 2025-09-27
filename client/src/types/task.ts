import { Project } from "./project";
import { User } from "./user";

export type TaskStatus = "pending" | "in-progress" | "completed"

export interface Task {
	_id: string;
	title: string;
	description: string;
	appliedBy?: User;
	status: TaskStatus;
	projectId: Project;
	ownerId: User;
	created_at: string;
	updated_at: string;
}
