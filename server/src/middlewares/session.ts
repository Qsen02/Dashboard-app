import { NextFunction, Response } from "express";
import { MyRequest } from "../types/express";
import { verifyToken } from "../services/token";

function session() {
	return function (req: MyRequest, res: Response, next: NextFunction) {
		const token = req.headers["x-authorization"];

		if (token) {
			try {
				const user = verifyToken(token as string);
				req.user = user;
			} catch (err) {
				res.status(403).json({ message: "Your session is not valid!" });
                return;
			}
		}
		next();
	};
}

export { session };
