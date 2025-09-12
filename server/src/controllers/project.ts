import { Router } from "express";
import {
	addMember,
	addTask,
	checkProjectId,
	createProject,
	deleteProject,
	editProjectName,
	getProjectById,
	getProjectMembers,
} from "../services/project";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { MyRequest } from "../types/express";
import { errorParser } from "../utils/error_parser";
import { checkUserId } from "../services/user";

const projectRouter = Router();

projectRouter.get("/:projectId/members", isUser(), async (req, res) => {
	const projectId = req.params.projectId;
	const isValid = await checkProjectId(projectId);
	if (!isValid) {
		return res.status(404).json({ message: "Resource not found" });
	}
	const members=await getProjectMembers(projectId);
	res.json(members);
});

projectRouter.get("/:projectId", isUser(), async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const project = await getProjectById(projectId);
		res.json(project);
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
	}
});

projectRouter.post(
	"/",
	isUser(),
	body("name")
		.isString()
		.isLength({ min: 3, max: 30 })
		.withMessage(
			"Project name is required and should be between 3 and 30 characters long!"
		),
	async (req: MyRequest, res) => {
		try {
			const fields = req.body;
			const user = req.user;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const project = await createProject(fields.name, user);
			res.json(project);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
		}
	}
);

projectRouter.put(
	"/add-member/:userId/in/:projectId",
	isUser(),
	async (req, res) => {
		const { userId, projectId } = req.params;
		try {
			const isValidProject = await checkProjectId(projectId);
			const isValidUser = await checkUserId(userId);
			if (!isValidProject || !isValidUser) {
				return res.status(404).json({ message: "Resource not found" });
			}
			const updatedProject = await addMember(projectId, userId);
			res.json(updatedProject);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
		}
	}
);

projectRouter.put(
	"/add-task/in/:projectId",
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
	async (req: MyRequest, res) => {
		const { projectId } = req.params;
		const user = req.user;
		const fields = req.body;
		try {
			const isValidProject = await checkProjectId(projectId);
			if (!isValidProject) {
				return res.status(404).json({ message: "Resource not found" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedProject = await addTask(
				user,
				projectId,
				fields.title,
				fields.description
			);
			res.json(updatedProject);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
		}
	}
);

projectRouter.put(
	"/project-name/:projectId/edit",
	isUser(),
	body("name")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Name required and must be at least 3 letters long!"),
	async (req, res) => {
		const projectId = req.params.projectId;
		const fields = req.body;
		const isValidProject = await checkProjectId(projectId);
		if (!isValidProject) {
			return res.status(404).json({ message: "Resource not found" });
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedProject = await editProjectName(
				projectId,
				fields.name
			);
			res.json(updatedProject);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
		}
	}
);

projectRouter.delete("/:projectId/delete", async (req, res) => {
	const projectId = req.params.projectId;
	const isValidProject = await checkProjectId(projectId);
	if (!isValidProject) {
		return res.status(404).json({ message: "Resource not found" });
	}
	try {
		await deleteProject(projectId);
		res.status(200).json({ message: "Project was deleted successfully!" });
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
	}
});

export { projectRouter };
