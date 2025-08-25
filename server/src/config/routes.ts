import { Express } from "express";
import { userRouter } from "../controllers/user";

function routesConfig(app: Express) {
	app.use("/users", userRouter);
	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}

export { routesConfig };