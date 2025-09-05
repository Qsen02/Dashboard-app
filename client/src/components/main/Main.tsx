import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";

export default function Main(props: { children: React.ReactNode }) {
	const { theme } = useSelector((state: RootState) => state.theme);

	return (
		<main
			className={
				theme === "light" ? "lightThemeLighter" : "darkThemeDarker"
			}
		>
			{props.children}
		</main>
	);
}
