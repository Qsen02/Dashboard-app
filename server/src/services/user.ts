import { UserModel } from "../models/users";
import { SearchesModel } from "../models/searches";
import bcrypt from "bcrypt";
import { User } from "../types/users";
import { Types } from "mongoose";

async function register(
	username: string,
	email: string,
	profileImage: string,
	password: string
) {
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
		profileImage: profileImage,
		password: await bcrypt.hash(password, 10),
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
		throw new Error("Username or password not match!");
	}
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw new Error("Username or password not match!");
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

async function editUser(
	userId: string,
	username: string,
	email: string,
	profileImage: string
) {
	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ $set: { username, email, profileImage } },
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

async function searchUsers(userId: string | undefined, query: string) {
	const users = await UserModel.find({
		username: { $regex: query, $options: "i" },
	}).lean();
	if (userId) {
		await SearchesModel.findOneAndUpdate(
			{ userId: userId },
			{
				$set: { searches: { users } },
			}
		);
	}
	return users;
}

async function getLastUsers() {
	const users = await UserModel.find()
		.sort({ $natural: -1 })
		.limit(1000)
		.lean();
	return users;
}

async function paginateUsers(
	userId: string | undefined,
	page: number,
	isSearched: string
) {
	const limit = 10;
	if (isSearched === "true") {
		const user = await SearchesModel.findOne({ userId })
			.populate("searches")
			.lean();
		const searches =
			user?.searches.slice((page - 1) * limit, page * limit) || [];
		const filteredSearches = searches.filter((el) => el);
		return filteredSearches;
	} else if (isSearched === "false") {
		const users = await UserModel.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
		return users;
	}
}

async function createSearches(userId: Types.ObjectId) {
	await SearchesModel.create({ userId: userId });
}

async function removeSearches(userId: string | undefined) {
	await SearchesModel.findByIdAndDelete(userId);
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
	searchUsers,
	getLastUsers,
	paginateUsers,
	createSearches,
	removeSearches,
};
