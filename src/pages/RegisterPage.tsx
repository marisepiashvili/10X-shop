import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useNavigate, useLocation } from "react-router"
import AuthShell from "../components/auth/AuthShell"
import FormField from "../components/auth/FormField"
import { registerSchema, type RegisterFormValues } from "../components/auth/authSchemas"
import { AccountError, registerUser } from "../components/auth/authStorage"

const initialValues : RegisterFormValues = {username: "", name: "", email: "", password: "", confirmPassword: ""}

export default function RegisterPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as {from?: string} | null)?.from ?? "/"

    // async so Formik resets isSubmitting after a failed attempt (see LoginPage)
    async function handleSubmit(values:RegisterFormValues, {setFieldError} : FormikHelpers<RegisterFormValues>) {
        try{
            registerUser({
                username: values.username.trim(),
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
                password: values.password
            })

            navigate("/login", {state: {from}})
        }catch(error){
            if (error instanceof AccountError) setFieldError(error.field, error.message)
            else setFieldError("email", "Registration failed")
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
                    name="username"
                    label="Username"
                    autoComplete="username"/>
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
                    className="mt-1 h-15 rounded-full bg-orange text-white border-4 border-sticker text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                        Create account</button>

                    <p className="text-sm text-center">Already have an account? <Link
                    to="/login"
                    state={{from}}
                    className="inline-block px-1.5 -mx-1.5 py-3.5 -my-3.5 font-extrabold underline hover:text-accent">Log in</Link></p>
            </Form>
        )}
    </Formik>
   </AuthShell>
  )
}
