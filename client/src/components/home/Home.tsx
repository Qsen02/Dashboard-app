import { useSelector } from "react-redux";
import { useGetUserProjects } from "../../hooks/useUser";
import { RootState } from "../../redux/state/store";

export default function Home() {
	const { user }=useSelector((state:RootState)=>state.user);
	const {projects,loading,error}=useGetUserProjects([],user?._id);

	return (
		<section>
			<div>
				<i className="fa-solid fa-square-plus"></i>
			</div>
			<h1>The projects you are involved in</h1>
			<section></section>
		</section>
	);
}
