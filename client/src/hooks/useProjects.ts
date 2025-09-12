import { useEffect, useState } from "react";
import { createProject, getProjectById, getProjectMembers } from "../api/projectService";
import { Project } from "../types/project";
import { useLoadingError } from "./useLoadingError";
import { User } from "../types/user";

export function useCreateProject() {
	return async function (data: object) {
		return await createProject(data);
	};
}

export function useGetOneProject(
	initValues: null,
	projectId: string | undefined
) {
	const [project, setProject] = useState<Project | null>(initValues);
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
				if (!signal.aborted && projectId) {
					const project = await getProjectById(projectId);
					setProject(project);
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
		project,
		loading,
		error,
	};
}

export function useGetProjectMembers(
	initValues: [],
	projectId: string | undefined
) {
	const [members, setMembers] = useState<User[]>(initValues);
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
				if (!signal.aborted && projectId) {
					const project = await getProjectMembers(projectId);
					setMembers(project);
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
		members,loading,error
	}
}
