import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../../types/user";
import styles from "./MemberItemStyles.module.css";
import { profileImageError } from "../../utils/imageErrors";
import { useAddMember, useRemoveMember } from "../../hooks/useProjects";
import { Project } from "../../types/project";

interface MemberItemProp {
	id: string;
	profileImage: string | undefined;
	username: string;
	theme: Theme | null;
	flag: "Add" | "List";
	projectId?: string;
	setProjectHandler: React.Dispatch<React.SetStateAction<Project | null>>;
}

export default function MemberItem({
	id,
	profileImage,
	username,
	theme,
	flag,
	projectId,
	setProjectHandler,
}: MemberItemProp) {
	const addMember = useAddMember();
	const removeMember = useRemoveMember();
	const navigate=useNavigate();

	async function onAddMember() {
		const updatedProject = await addMember(id, projectId);
		setProjectHandler(updatedProject);
		navigate(`/projects/${projectId}/successfull-action/${username}/add`);
	}

	async function onRemoveMember() {
		const updatedProject = await removeMember(projectId, id);
		setProjectHandler(updatedProject);
		navigate(`/projects/${projectId}/successfull-action/${username}/remove`);
	}

	return (
		<article
			className={`
				${theme === "light" ? "lightThemeSmoked" : "darkThemeLighter"}
                ${styles.wrapper}
			`}
		>
			<Link to={`/profile/${id}`}>
				<img
					src={profileImage}
					alt={username}
					onError={profileImageError}
				/>
			</Link>
			<h3>{username}</h3>
			{flag === "List" ? (
				<button onClick={onRemoveMember}>Remove</button>
			) : (
				<button onClick={onAddMember}>Add</button>
			)}
		</article>
	);
}
