import express from "express";
import { expressConfig } from "./config/express";
import { runDB } from "./config/mongoose";
import { routesConfig } from "./config/routes";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

async function startServer() {
	await runDB();
	expressConfig(app);
	routesConfig(app);
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
}

startServer();
