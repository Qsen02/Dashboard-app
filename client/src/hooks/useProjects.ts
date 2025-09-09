import { createProject } from "../api/projectService"

export function useCreateProject(){
    return async function (data:object){
        return await createProject(data);
    }
}