import { useEffect, useState } from "react";
import { getUserProjects, login, logout, register } from "../api/userService";
import { Project } from "../types/project";
import { useLoadingError } from "./useLoadingError";

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

export function useGetUserProjects(initialValue: [], userId: string | undefined) {
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
                if(!signal.aborted && userId){
                    const projects=await getUserProjects(userId);
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
        projects,loading,error
    }
}
