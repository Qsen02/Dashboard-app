import mongoose from "mongoose";
import { TaskModel } from "../models/tasks";
import { UserModel } from "../models/users";
import { ProjectModel } from "../models/projects";
import { SearchesModel } from "../models/searches";

const localDB = "mongodb://127.0.0.1:27017/Dashboard";

async function runDB() {
	await mongoose.connect(process.env.PRODUCTION_DB || localDB);
    await TaskModel.init();
    await UserModel.init();
    await ProjectModel.init();
    await SearchesModel.init();
	console.log("Database is running...");
}

export { runDB };
