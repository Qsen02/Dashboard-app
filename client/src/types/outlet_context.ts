import { Project } from "./project";
import { User, UserForAuth } from "./user";

export interface ProjectOutletContext {
	setProjectHandler: React.Dispatch<React.SetStateAction<Project | null>>;
	projectName: string | undefined;
	members: User[] | undefined;
	owner: User | undefined;
}

export interface ProfileOutletContext {
	curUser: UserForAuth | null;
}
