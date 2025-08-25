import { UserPayload } from "../types/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Types } from "mongoose";

interface User {
    _id: Types.ObjectId;
    email: string;
    username: string;
    role: "admin" | "user" | "programmer";
    password: string;
    projects: Types.ObjectId[];
	profileImage?: string;
}

function setToken(user: User) {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.username,
        role: user.role,
		profileImage: user.profileImage
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