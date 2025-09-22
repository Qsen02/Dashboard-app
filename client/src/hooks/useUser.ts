import { useEffect, useState } from "react";
import {
	changePassword,
	editUser,
	getLatestUsers,
	getUserById,
	getUserProjects,
	login,
	logout,
	paginateUsers,
	register,
	searchUsers,
} from "../api/userService";
import { Project } from "../types/project";
import { useLoadingError } from "./useLoadingError";
import { User } from "../types/user";

export function useRegister() {
	return async function (data: object) {
		return await register(data);
	};
}

export function useLogin() {
	return async function (data: object) {
		return await login(data);
	};
}

export function useLogout() {
	return async function () {
		return await logout();
	};
}

export function useGetUserProjects(
	initialValue: [],
	userId: string | undefined
) {
	const [projects, setProjects] = useState<Project[]>(initialValue);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted && userId) {
					const projects = await getUserProjects(userId);
					setProjects(projects);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				return;
			}
		})();

		return () => {
			controller.abort();
		};
	}, []);

	return {
		projects,
		loading,
		error,
	};
}

export function useGetLatestUsers(initValues: []) {
	const [users, setUsers] = useState<User[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted) {
					const curUsers = await getLatestUsers();
					setUsers(curUsers);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				return;
			}
		})();
	}, []);

	return {
		users,
		setUsers,
		loading,
		setLoading,
		error,
		setError
	};
}

export function useSearchUsers(){
	return async function (query:string){
		return await searchUsers(query);
	}
}

export function useGetOneUser(
	initialValue: null,
	userId: string | undefined
) {
	const [user, setUser] = useState<User | null>(initialValue);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted && userId) {
					const curUser = await getUserById(userId);
					setUser(curUser);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				return;
			}
		})();

		return () => {
			controller.abort();
		};
	}, []);

	return {
		user,
		loading,
		error,
	};
}

export function useEditProfile(){
	return async function (userId:string | undefined,data:object){
		return await editUser(userId,data);
	}
}

export function useChangePassword(){
	return async function (userId:string | undefined,data:object){
		return await changePassword(userId,data);
	}
}

export function usePaginateUsers(initValues:[]){
	const [users,setUsers] = useState<User[]>(initValues);
	const [maxPage,setMaxPage] = useState(1);
	const [curPage,setCurPage]=useState(1);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);
	const [isSearched,setIsSearched] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted) {
					const {users,maxPage} = await paginateUsers(curPage,isSearched);
					setUsers(users);
					setMaxPage(maxPage);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				return;
			}
		})();

		return () => {
			controller.abort();
		};
	}, [curPage,isSearched]);

	return {
		users,
		setUsers,
		loading,
		setLoading,
		error,
		setError,
		maxPage,
		curPage,
		setCurPage,
		isSearched,
		setIsSearched
	};
}
