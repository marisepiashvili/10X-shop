import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useNavigate } from "react-router"
import AuthShell from "../components/auth/AuthShell"
import FormField from "../components/auth/FormField"
import { registerSchema, type RegiterFormValues } from "../components/auth/authSchemas"
import { registerUser } from "../components/auth/authStorage"

const initialValues : RegiterFormValues = {name: "", email: "", password: "", confirmPassword: ""}

export default function RegisterPage() {
    const navigate = useNavigate()

    async function handleSubmit(values:RegiterFormValues, {setFieldError} : FormikHelpers<RegiterFormValues>) {
        try{
            registerUser({
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
                password: values.password
            })

            navigate("/login")
        }catch(error){
            setFieldError("email", error instanceof Error ? error.message : "Registration failed")
        }

    }

  return (
   <AuthShell
    note="new here? ✶"
    title="Join the shop"
    text="Create an account in a few seconds and check out faster."
    ticketTitle="NEW MEMBER"
   >
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
            <Form noValidate className="flex flex-col gap-4.5">
                    <FormField
                    name="name" 
                    label="Name" 
                    autoComplete="name"/>
                    <FormField 
                    name="email" 
                    label="Email" 
                    type="email" 
                    autoComplete="email"/>
                    <FormField 
                    name="password" 
                    label="Password" 
                    type="password" 
                    autoComplete="new-password"/>
                    <FormField 
                    name="confirmPassword" 
                    label="Confirm password" 
                    type="password" 
                    autoComplete="new-password"/>

                    <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 h-15 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                        Create account</button>

                    <p className="text-sm text-center">Already have an account? <Link to="/login" className="font-extrabold underline hover:text-blue">Log in</Link></p>
            </Form>
        )}
    </Formik>
   </AuthShell>
  )
}
