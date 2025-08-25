import { Request,Response,NextFunction } from "express";

function setCors(){
    return function (req:Request,res:Response,next:NextFunction){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, X-Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    }
}

export {
    setCors
}