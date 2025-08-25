import { Task } from "./tasks";
import { User } from "./users";

export interface Project{
    _id:string;
    name:string;
    ownerId:User;
    members:User[];
    tasks:Task[];
}