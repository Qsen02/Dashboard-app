import { Task } from "./task";
import { User } from "./user";

export interface Project {
	_id: string;
	name: string;
	tasks: Task[];
	members: User[];
	ownerId: User;
	created_at: string;
	updated_at: string;
}
