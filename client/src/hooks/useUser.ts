import { login, register } from "../api/userService"

export function useRegister(){
    return async function (data:object){
        return await register(data);
    }
}

export function useLogin(){
    return async function (data:object){
        return await login(data);
    }
}