import { ProjectModel } from "../models/projects";
import { TaskModel } from "../models/tasks";
import { UserModel } from "../models/users";
import { UserPayload } from "../types/users";

async function getProjectById(projectId: string) {
	const project = await ProjectModel.findById(projectId)
		.populate("members")
		.populate("ownerId")
		.populate("tasks")
		.lean();
	if (!project) {
		throw new Error("Resource not found");
	}
	return project;
}

async function createProject(
	name: string,
	user: UserPayload | null | undefined
) {
	if (!user) {
		throw new Error("Unauthorized");
	}
	const project = await ProjectModel.create({
		name,
		ownerId: user._id,
	});
	await UserModel.findByIdAndUpdate(user._id, {
		$push: { projects: project._id },
	});
	return project;
}

async function addMember(projectId: string, userId: string) {
	const updatedProject = await ProjectModel.findByIdAndUpdate(
		projectId,
		{ $push: { members: userId } },
		{ new: true }
	)
		.populate("members")
		.populate("ownerId")
		.populate("tasks")
		.lean();
	return updatedProject;
}

async function addTask(
	user: UserPayload | null | undefined,
	projectId: string,
	title: string,
	description: string
) {
	if (!user) {
		throw new Error("Unauthorized");
	}
	const task = await TaskModel.create({
		title: title,
		description: description,
		status: "pending",
		ownerId: user._id,
		projectId,
	});
	const updatedProject = await ProjectModel.findByIdAndUpdate(
		projectId,
		{ $push: { tasks: task._id } },
		{ new: true }
	)
		.populate("members")
		.populate("ownerId")
		.populate("tasks")
		.lean();
	return updatedProject;
}

async function editProjectName(projectId: string, newName: string) {
	const updatedProject = await ProjectModel.findByIdAndUpdate(
		projectId,
		{ $set: { name: newName } },
		{ new: true }
	)
		.populate("members")
		.populate("ownerId")
		.populate("tasks")
		.lean();
	return updatedProject;
}

async function deleteProject(projectId: string) {
	const deletedProject = await ProjectModel.findByIdAndDelete(projectId)
		.populate("members")
		.populate("ownerId")
		.populate("tasks")
		.lean();
	await TaskModel.deleteMany({ projectId });
	return deletedProject;
}

async function checkProjectId(projectId: string) {
	const project = await ProjectModel.findById(projectId).lean();
	if (!project) {
		return false;
	}
	return true;
}

export {
	getProjectById,
	createProject,
	addMember,
	addTask,
	editProjectName,
	deleteProject,
	checkProjectId,
};
