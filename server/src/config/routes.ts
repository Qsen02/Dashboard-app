import { Express } from "express";
import { userRouter } from "../controllers/user";
import { projectRouter } from "../controllers/project";
import { taskRouter } from "../controllers/tasks";

function routesConfig(app: Express) {
	app.use("/users", userRouter);

	app.use("/projects", projectRouter);

	app.use("/tasks", taskRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}

export { routesConfig };
