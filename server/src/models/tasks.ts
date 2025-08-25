import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	status: {
		type: String,
		enum: ["pending", "in-progress", "completed"],
		default: "pending",
	},
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
	appliedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null,
	},
}, {timestamps:{createdAt:"created_at",updatedAt:"updated_at"}});

const TaskModel = mongoose.model("Task", taskShema);

export {
    TaskModel
}
