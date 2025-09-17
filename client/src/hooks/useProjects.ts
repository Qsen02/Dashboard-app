import { useEffect, useState } from "react";
import {
	addMemberToProject,
	addTaskToProject,
	createProject,
	deleteProject,
	editProjectName,
	getProjectById,
	removeMember,
} from "../api/projectService";
import { Project } from "../types/project";
import { useLoadingError } from "./useLoadingError";

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
		setProject,
		loading,
		error,
	};
}

export function useAddTask() {
	return async function (projectId: string | undefined, data: object) {
		return await addTaskToProject(projectId, data);
	};
}

export function useDeleteProject(){
	return async function (projectId:string|undefined){
		return await deleteProject(projectId);
	}
}

export function useEditProject(){
	return async function (projectId:string | undefined, data:object){
		return await editProjectName(projectId,data);
	}
}

export function useAddMember(){
	return async function (userId:string,projectId:string | undefined){
		return await addMemberToProject(userId,projectId)
	}
}

export function useRemoveMember(){
	return async function (projectId:string | undefined,userId:string){
		return await removeMember(projectId,userId);
	}
}
