import { useEffect, useState } from "react";
import {
	applyToTask,
	changeTaskStatus,
	deleteTask,
	editTask,
	getTaskById,
} from "../api/taskService";
import { useLoadingError } from "./useLoadingError";
import { Task } from "../types/task";

export function useDeleteTask() {
	return async function (
		taskId: string | undefined,
		projectId: string | undefined
	) {
		return await deleteTask(taskId, projectId);
	};
}

export function useEditTask() {
	return async function (taskId: string | undefined, data: object) {
		return await editTask(taskId, data);
	};
}

export function useGetOneTask(initValues: null, taskId: string | undefined) {
	const [task, setTask] = useState<Task | null>(initValues);
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
				if (!signal.aborted && taskId) {
					const curTask = await getTaskById(taskId);
					setTask(curTask);
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
		task,
		loading,
		error,
	};
}

export function useApplyForTask() {
	return async function (taskId: string) {
		return await applyToTask(taskId);
	};
}

export function useChangeTaskStatus() {
	return async function (taskId: string, data: { status: Task["status"] }) {
		return await changeTaskStatus(taskId, data);
	};
}
