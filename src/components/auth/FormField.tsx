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
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-bold">{label}</label>
            <input
            {...field} 
            id={name}
            type={type} 
            autoComplete={autoComplete}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`h-12 rounded-full border-2 bg-white px-5 text-[#12424A] focus:outline-none focus-visible:shadow-[3px_3px_0_#12424A] ${hasError ? "border-red-600" : "border-[#12424A]"}`}/>
            {hasError && <p id={errorId} className="text-xs text-red-600">{meta.error}</p>}
        </div>
    )
}