import { Request } from "express";
import { UserPayload } from "./users";

export interface MyRequest extends Request {
    user?: UserPayload | null
}