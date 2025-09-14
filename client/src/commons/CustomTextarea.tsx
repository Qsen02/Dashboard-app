import { useField } from "formik";

interface CustomTextareaProps {
    label?: string;
    name: string;
    type: string;
    className?: string;
    value: string;
    id:string;
    autoComplete?:string;
}

export default function CustomTextarea({ label, ...props }: CustomTextareaProps) {
    const [field, meta] = useField(props);
    return (
        <>
            {label ? <label htmlFor={props.id}>{label}</label> : ""}
            <textarea {...props} {...field}></textarea>
            {meta.error && meta.touched ? (
                <p className="error">{meta.error}</p>
            ) : (
                ""
            )}
        </>
    );
}