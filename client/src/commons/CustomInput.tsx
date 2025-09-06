import { useField } from "formik";

interface CustomInputProps {
	label?: string;
	name: string;
	type: string;
	className?: string;
	value: string;
	id:string;
	autoComplete?:string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
	const [field, meta] = useField(props);
	return (
		<>
			{label ? <label htmlFor={props.id}>{label}</label> : ""}
			<input {...props} {...field}/>
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
