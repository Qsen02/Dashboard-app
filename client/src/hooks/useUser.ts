import { register } from "../api/userService"

export function useRegister(){
    return async function (data:object){
        return await register(data);
    }
}