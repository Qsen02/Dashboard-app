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

export async function editTask(taskId: string, data: object) {
	const updatedTask = await put(`${endpoint}/${taskId}/edit`, data);
	return updatedTask as Task;
}

export async function deleteTask(taskId: string, projectId: string) {
	await del(`${endpoint}/${taskId}/delete/in/${projectId}`);
}
