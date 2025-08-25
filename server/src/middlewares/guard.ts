import { NextFunction, Request, Response } from "express";

function isUser() {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.headers["x-authorization"]) {
			return res.status(401).json({ message: "You are not authorized!" });
		}
		next();
	};
}

export { isUser };
