import { ProjectModel } from "../models/projects";
import { TaskModel } from "../models/tasks";

async function getTaskById(taskId: string) {
	const task = await TaskModel.findById(taskId)
		.populate("appliedBy")
		.populate("ownerId")
		.populate("projectId")
		.lean();
	if (!task) {
		throw new Error("Resource not found");
	}

	return task;
}

async function applyForTask(taskId: string, userId: string | null | undefined) {
	if (!userId) {
		throw new Error("You are not authenticated!");
	}
	const updatedTask = await TaskModel.findByIdAndUpdate(
		taskId,
		{ $set: { appliedBy: userId } },
		{ new: true }
	).lean();

	const updatedProject = await ProjectModel.findById(updatedTask?.projectId)
		.populate("members")
		.populate({
			path: "tasks",
			populate: {
				path: "appliedBy",
			},
		})
		.populate("ownerId")
		.lean();

	return updatedProject;
}

async function changeTaskStatus(
	taskId: string,
	status: "pending" | "in-progress" | "completed"
) {
	const updatedTask = await TaskModel.findByIdAndUpdate(
		taskId,
		{ $set: { status } },
		{ new: true }
	).lean();

	const updatedProject = await ProjectModel.findById(updatedTask?.projectId)
		.populate("members")
		.populate({
			path: "tasks",
			populate: {
				path: "appliedBy",
			},
		})
		.populate("ownerId")
		.lean();

	return updatedProject;
}

async function deleteTask(taskId: string, projectId: string) {
	const updateProject = await ProjectModel.findByIdAndUpdate(
		projectId,
		{ $pull: { tasks: taskId } },
		{ new: true }
	)
		.populate({
			path: "tasks",
			populate: {
				path: "appliedBy",
			},
		})
		.populate("ownerId")
		.populate("members")
		.lean();
	await TaskModel.findByIdAndDelete(taskId);
	return updateProject;
}

async function editTask(taskId: string, title: string, description: string) {
	const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
		$set: { title, description },
	}).lean();
	const updatedProject = await ProjectModel.findById(updatedTask?.projectId)
		.populate("members")
		.populate({
			path: "tasks",
			populate: {
				path: "appliedBy",
			},
		})
		.populate("ownerId")
		.lean();

	return updatedProject;
}

async function checkTaskId(taskId: string) {
	const task = await TaskModel.findById(taskId).lean();
	if (!task) {
		return false;
	}
	return true;
}

export {
	getTaskById,
	applyForTask,
	changeTaskStatus,
	deleteTask,
	editTask,
	checkTaskId,
};
