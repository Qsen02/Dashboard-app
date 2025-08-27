import { User } from "./users";

export interface Searches {
	_id: string;
	userId: string;
	searches: User[];
}
