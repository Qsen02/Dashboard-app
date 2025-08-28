import { Router } from "express";
import {
	changePassword,
	changeRole,
	checkUserId,
	createSearches,
	editUser,
	getLastUsers,
	getUserById,
	getUserProjects,
	login,
	paginateUsers,
	register,
	removeSearches,
	searchUsers,
} from "../services/user";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/error_parser";
import { setToken } from "../services/token";
import { MyRequest } from "../types/express";

const userRouter = Router();

userRouter.get("/logout", isUser(), async (req: MyRequest, res) => {
	const user = req.user;
	await removeSearches(user?._id);
	res.status(200).json({ message: "User logged out successfully" });
});

userRouter.get("/search/:value", isUser(), async (req: MyRequest, res) => {
	try {
		const query = req.params.value;
		const user = req.user;
		const users = await searchUsers(user?._id, query);
		res.json(users);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Unknown error" });
		}
	}
});

userRouter.get("/latest", isUser(), async (req, res) => {
	try {
		const users = await getLastUsers();
		res.json(users);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Unknown error" });
		}
	}
});

userRouter.get("/:userId", async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await getUserById(userId);
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(404).json({ message: "Unknown error" });
		}
	}
});

userRouter.get(
	"/page/:page/isSearched/:isSearched",
	isUser(),
	async (req: MyRequest, res) => {
		const page = Number(req.params.page);
		const isSearched = req.params.isSearched;
		const user = req.user;
		try {
			const users = await paginateUsers(user?._id, page, isSearched);
			res.json(users);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unknown error" });
			}
		}
	}
);

userRouter.get("/:userId/projects", isUser(), async (req, res) => {
	const userId = req.params.userId;
	const isValid = await checkUserId(userId);
	if (!isValid) {
		return res.status(404).json({ message: "Resource not found!" });
	}
	const projects = await getUserProjects(userId);
	res.json(projects);
});

userRouter.post(
	"/register",
	body("username")
		.trim()
		.isString()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long!"),
	body("email").trim().isEmail().withMessage("Email must be valid!"),
	body("profileImage")
		.custom(
			(value: string, { req }) =>
				value.length == 0 || /^https?:\/\//.test(value)
		)
		.withMessage("Image must be valid URL!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols and must contain digits, letters and at least one capital letter and special symbol!"
		),
	body("repass")
		.custom((value, { req }) => req.body.password === value)
		.withMessage("Passwords don't match!"),
	async (req, res) => {
		try {
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const newUser = await register(
				fields.username,
				fields.email,
				fields.profileImage,
				fields.password
			);
			const token = setToken(newUser);
			await createSearches(newUser._id);
			res.json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				accessToken: token,
				role: newUser.role,
				profileImage: newUser.profileImage,
			});
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unknown error" });
			}
		}
	}
);

userRouter.post(
	"/login",
	body("username")
		.trim()
		.isString()
		.isLength({ min: 3 })
		.withMessage("Username or password not match!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage("Username or password not match!"),
	async (req, res) => {
		try {
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const newUser = await login(fields.username, fields.password);
			await createSearches(newUser._id);
			const token = setToken(newUser);
			res.json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				accessToken: token,
				role: newUser.role,
				profileImage: newUser.profileImage,
			});
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unknown error" });
			}
		}
	}
);

userRouter.put("/:userId/change-role/:role", isUser(), async (req, res) => {
	const userId = req.params.userId;
	const newRole = req.params.role;
	const isValid = await checkUserId(userId);
	if (!isValid) {
		return res.status(404).json({ message: "Resource not found!" });
	}
	const updatedUser = await changeRole(userId, newRole);
	res.json(updatedUser);
});

userRouter.put(
	"/:userId/edit",
	body("username")
		.trim()
		.isString()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long!"),
	body("email").trim().isEmail().withMessage("Email must be valid!"),
	body("profileImage")
		.custom(
			(value: string, { req }) =>
				value.length == 0 || /^https?:\/\//.test(value)
		)
		.withMessage("Image must be valid URL!"),
	isUser(),
	async (req, res) => {
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		try {
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await editUser(
				userId,
				fields.username,
				fields.email,
				fields.profileImage
			);
			res.json(updatedUser);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unknown error" });
			}
		}
	}
);

userRouter.put(
	"/:userId/change-password",
	body("newPassword")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols and must contain digits, letters and at least one capital letter and special symbol!"
		),
	isUser(),
	async (req, res) => {
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		try {
			const fields = req.body;
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await changePassword(
				userId,
				fields.newPassword
			);
			res.json(updatedUser);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unknown error" });
			}
		}
	}
);

export { userRouter };
