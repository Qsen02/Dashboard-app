import { User, UserPayload } from "../types/users";
import jwt from "jsonwebtoken";

function setToken(user: User) {
	const payload = {
		id: user._id,
		email: user.email,
		name: user.username,
		role: user.role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "3d",
	});

	return token;
}

function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded as UserPayload;
    } catch (error) {
        return null;
    }
}

export { setToken, verifyToken };