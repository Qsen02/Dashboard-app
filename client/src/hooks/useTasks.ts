import { deleteTask } from "../api/taskService"

export function useDeleteTask(){
    return async function (taskId:string | undefined,projectId:string| undefined,){
        return await deleteTask(taskId,projectId);
    }
}