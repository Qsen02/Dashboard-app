import mongoose from "mongoose";

const searchesShema = new mongoose.Schema(
	{
		userId: { type: String, required: true, unique: true },
		searches: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const SearchesModel = mongoose.model("Searches", searchesShema);

export {
    SearchesModel,
}