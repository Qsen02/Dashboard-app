import mongoose from "mongoose";

const projectShema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		members: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
		tasks: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProjectModel = mongoose.model("Project", projectShema);

export { ProjectModel };
