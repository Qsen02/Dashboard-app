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
		ref: "Users",
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Projects",
	},
	appliedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		default: null,
	},
}, {timestamps:{createdAt:"created_at",updatedAt:"updated_at"}});

const TaskModel = mongoose.model("Tasks", taskShema);

export {
    TaskModel
}
