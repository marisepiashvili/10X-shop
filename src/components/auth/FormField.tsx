import { useField } from "formik";

type FormFieldProps = {
    name: string
    label: string
    type?: "text" | "email" | "password"
    autoComplete?: string
}

export default function FormField ({name, label, type = "text", autoComplete}: FormFieldProps){
    const [field, meta] = useField(name)
    const hasError = meta.touched && Boolean(meta.error)
    const errorId = `${name}-error`;
    

    return(
        <div className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-sm font-extrabold">{label}</label>
            <input
            {...field} 
            id={name}
            type={type} 
            autoComplete={autoComplete}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`h-13.5 rounded-full bg-white px-5.5 ${hasError ? "border-[3px] border-danger" : "border-2 border-ink"}`}/>
            {hasError && <p id={errorId} className="text-sm font-bold text-danger pl-2.5">{meta.error}</p>}
        </div>
    )
}