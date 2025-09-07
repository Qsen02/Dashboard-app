import { NavLink } from "react-router-dom";

interface LinkItemProps {
	name: string;
	link: string;
}

export default function LinkItem({ name, link }: LinkItemProps) {
	return (
		<li>
			<NavLink
				to={link}
				style={({isActive}) =>
					isActive
						? { color: "rgba(110, 8, 205, 1)" }
						: {}
				}
			>
				{name}
			</NavLink>
		</li>
	);
}
