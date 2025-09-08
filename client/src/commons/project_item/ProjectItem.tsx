import { Link } from "react-router-dom";
import { Theme } from "../../types/user";

interface ProjectItemProps {
    id:string;
    name:string;
    membersCount:number;
    tasksCount:number;
    theme:Theme;
}

export default function ProjectItem({
    id,name,membersCount,tasksCount,theme
}){
return(
    <Link to={`/projects/${id}`}>
        <article>
            <h2>{name}</h2>
            <div>
                <p>Tasks: {tasksCount}</p>
                <p>Members: {tasksCount}</p>
            </div>
        </article>
    </Link>
)
}