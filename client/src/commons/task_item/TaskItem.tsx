import { TaskStatus } from "../../types/task";
import { Theme, User, UserForAuth } from "../../types/user";

interface TaskItemProps {
    id:string;
    title:string;
    description:string;
    user:UserForAuth | null;
    theme: Theme | null;
    owner:User;
    status: TaskStatus;
}

export default function TaskItem({
    id,title,description,user,theme,owner,status
}:TaskItemProps){
    return (
        <article>
            <h3>{title}</h3>
            <p>{description}</p>
            {
                user?._id === owner._id
                ?<div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                :status === "pending"? <div>
                    <button>Apply</button>
                    <button>Move</button>
                </div>
                :status === "in-progress"?<div>
                    <button>Return</button>
                    <button>Succeeded</button>
                </div>
                : <div>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            }
        </article>
    )
}