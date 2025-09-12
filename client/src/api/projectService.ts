import { Project } from "../types/project";
import { User } from "../types/user";
import { del, get, post, put } from "./requester";

const endpoint = "projects";

export async function getProjectById(projectId: string) {
	const project = await get(`${endpoint}/${projectId}`);
	return project as Project;
}

export async function getProjectMembers(projectId: string) {
	const members = await get(`${endpoint}/${projectId}/members`);
	return members as User[];
}

export async function createProject(data: object) {
	const project = await post(`${endpoint}`, data);
	return project as Project;
}

export async function addMemberToProject(userId: string, projectId: string) {
	const updatedProject = await put(
		`${endpoint}/add-member/${userId}/in/${projectId}`,
		{}
	);
	return updatedProject as Project;
}

export async function addTaskToProject(projectId: string, data: object) {
	const updatedProject = await put(
		`${endpoint}/add-task/in/${projectId}`,
		data
	);
	return updatedProject as Project;
}

export async function editProjectName(projectId: string, data: object) {
	const updatedProject = await put(
		`${endpoint}/project-name/${projectId}/edit`,
		data
	);
	return updatedProject as Project;
}

export async function deleteProject(projectId: string) {
	await del(`${endpoint}/${projectId}/delete`);
}
