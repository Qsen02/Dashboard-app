import { useField } from "formik";
import { Theme } from "../types/user";

interface CustomInputProps {
	label?: string;
	name: string;
	type: string;
	className?: string;
	value: string;
	theme: Theme;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
	const [field, meta] = useField(props);
	return (
		<>
			{label ? <label>{label}</label> : ""}
			<input {...props} {...field} />
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
