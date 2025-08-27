import mongoose from "mongoose";

const searchesShema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		searches: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Searches = mongoose.model("Searches", searchesShema);

export {
    Searches,
}