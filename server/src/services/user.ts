import { UserModel } from "../models/users";
import bcrypt from "bcrypt";
import { User } from "../types/users";

async function register(username: string, email: string,profileImage:string|null, password: string) {
	const isValidUsername = await UserModel.findOne({ username });
	if (isValidUsername) {
		throw new Error("Username is already taken!");
	}
	const isValidEmail = await UserModel.findOne({ email });
	if (isValidEmail) {
		throw new Error("Email is already taken!");
	}
	const user = new UserModel({
		username,
		email,
		password: await bcrypt.hash(password, 10),
		profileImage
	});
	await user.save();

	return user;
}

async function getUserById(userId: string) {
	const user = await UserModel.findById(userId).populate("projects").lean();
	if (!user) {
		throw new Error("Resource not found");
	}
	return user;
}

async function login(username: string, password: string) {
	const user = await UserModel.findOne({ username });
	if (!user) {
		throw new Error("Invalid username or password!");
	}
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw new Error("Invalid username or password!");
	}
	return user;
}

async function changeRole(userId: string, newRole: string) {
	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ $set: { role: newRole } },
		{ new: true }
	)
		.populate("projects")
		.lean();
	return updatedUser;
}

async function editUser(userId: string, data: Partial<User>) {
	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ $set: { data } },
		{ new: true }
	)
		.populate("projects")
		.lean();
	return updatedUser;
}

async function changePassword(userId: string, newPassword: string) {
	const user = await UserModel.findById(userId).lean();
	const isOldPassword = await bcrypt.compare(newPassword, user!.password);
	if (isOldPassword) {
		throw new Error("Old password can't be the new password!");
	}
	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ $set: { password: await bcrypt.hash(newPassword, 10) } },
		{ new: true }
	)
		.populate("projects")
		.lean();
	return updatedUser;
}

async function checkUserId(userId: string) {
	const user = await UserModel.findById(userId).lean();
	if (!user) {
		return false;
	}

	return true;
}

async function getUserProjects(userId: string) {
	const user = await UserModel.findById(userId).populate("projects").lean();
	return user?.projects || [];
}

export {
	register,
	getUserById,
	login,
	changeRole,
	editUser,
	changePassword,
	checkUserId,
	getUserProjects,
};
