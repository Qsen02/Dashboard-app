import { Project } from "../types/project";
import { Task } from "../types/task";
import { del, get, post, put } from "./requester";

const endpoint = "tasks";

export async function getTaskById(taskId: string) {
	const task = await get(`${endpoint}/${taskId}`);
	return task as Task;
}

export async function applyToTask(taskId: string) {
	const updatedTask = await post(`${endpoint}/${taskId}/apply`, {});
	return updatedTask as Task;
}

export async function changeTaskStatus(taskId: string, data: object) {
	const updatedTask = await put(`${endpoint}/${taskId}/change-status`, data);
	return updatedTask as Task;
}

export async function editTask(taskId: string | undefined, data: object) {
	const updatedTask = await put(`${endpoint}/${taskId}/edit`, data);
	return updatedTask as Project;
}

export async function deleteTask(taskId: string | undefined, projectId: string | undefined) {
	const updatedProject = await del(`${endpoint}/${taskId}/delete/in/${projectId}`);
	return updatedProject as Project;
}
