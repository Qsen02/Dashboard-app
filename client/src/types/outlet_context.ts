import { Project } from "./project";

export interface ProjectOutletContext {
	setProjectHandler: React.Dispatch<React.SetStateAction<Project | null>>;
}
