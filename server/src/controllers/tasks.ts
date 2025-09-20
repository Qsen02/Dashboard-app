import { Router } from "express";
import { isUser } from "../middlewares/guard";
import {
	applyForTask,
	changeTaskStatus,
	checkTaskId,
	deleteTask,
	editTask,
	getTaskById,
} from "../services/task";
import { MyRequest } from "../types/express";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/error_parser";
import { checkProjectId } from "../services/project";

const taskRouter = Router();

taskRouter.get("/:taskId", isUser(), async (req, res) => {
	try {
		const taskId = req.params.taskId;
		const task = await getTaskById(taskId);
		res.json(task);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

taskRouter.post("/:taskId/apply", isUser(), async (req: MyRequest, res) => {
	try {
		const taskId = req.params.taskId;
		const user = req.user;
		const isValid = await checkTaskId(taskId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found" });
		}
		const updatedProject = await applyForTask(taskId, user?._id);
		res.json(updatedProject);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

taskRouter.put(
	"/:taskId/change-status",
	isUser(),
	body("status")
		.isString()
		.isIn(["pending", "in-progress", "completed"])
		.withMessage("Status must be pending, in-progress or completed!"),
	async (req, res) => {
		try {
			const taskId = req.params.taskId;
			const isValid = await checkTaskId(taskId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found" });
			}
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedProject = await changeTaskStatus(taskId, fields.status);
			res.json(updatedProject);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

taskRouter.put(
	"/:taskId/edit",
	isUser(),
	body("title")
		.isString()
		.isLength({ min: 3 })
		.withMessage(
			"Title is required and should be at least 3 characters long!"
		),
	body("description")
		.isString()
		.isLength({ min: 10 })
		.withMessage(
			"Description is required and should be at least 10 characters long!"
		),
	async (req, res) => {
		try {
			const taskId = req.params.taskId;
			const isValid = await checkTaskId(taskId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found" });
			}
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedProject = await editTask(
				taskId,
				fields.title,
				fields.description
			);
			res.json(updatedProject);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

taskRouter.delete(
	"/:taskId/delete/in/:projectId",
	isUser(),
	async (req, res) => {
		try {
			const taskId = req.params.taskId;
			const projectId = req.params.projectId;
			const isValidTask = await checkTaskId(taskId);
			const isValidProject = await checkProjectId(projectId);
			if (!isValidProject || !isValidTask) {
				return res.status(404).json({ message: "Resource not found" });
			}
			const updatedProject = await deleteTask(taskId, projectId);
			res.status(200).json(updatedProject);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

export { taskRouter };
