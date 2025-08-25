import mongoose from "mongoose";
import { TaskModel } from "../models/tasks";
import { UserModel } from "../models/users";
import { ProjectModel } from "../models/projects";

async function runDB() {
	await mongoose.connect("mongodb://127.0.0.1:27017/Dashboard");
    await TaskModel.init();
    await UserModel.init();
    await ProjectModel.init();
	console.log("Database is running...");
}

export { runDB };
