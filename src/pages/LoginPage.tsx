import { FormikProvider, useFormik, type FormikHelpers } from "formik"
import { Link, useLocation, useNavigate } from "react-router"
import { getFromPath } from "../utils/guards"
import AuthShell from "../components/auth/AuthShell"
import FormField from "../components/auth/FormField"
import { loginSchema, type LoginFormValues } from "../components/auth/authSchemas"
import useAuth from "../hooks/useAuth"


const initialValues : LoginFormValues = {username: "", password:""}

export default function LoginPage (){
    const navigate = useNavigate()
    const {login} = useAuth()
    const location = useLocation()
    const from = getFromPath(location.state)
    const isFromCheckout = from === "/checkout"

    // async on purpose: Formik resets isSubmitting only when onSubmit returns a Promise,
    // so a sync handler would leave the button disabled after a failed attempt
    async function handleSubmit(values: LoginFormValues, {setStatus} : FormikHelpers<LoginFormValues>) {
        try{
            login(values.username.trim(), values.password)
            navigate(from, {replace: true})
        }catch (error){
            setStatus(error instanceof Error ? error.message : "Login failed")
        }
    }

    // useFormik holds the form state; FormikProvider shares it with FormField (useField)
    const formik = useFormik<LoginFormValues>({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    })

    return(
        <AuthShell
            note="welcome back ✶"
            title={isFromCheckout ? "Log in & check out" : "Log in"}
            text={isFromCheckout ? "One quick step and your order is on its way." : "Good to see you again. Your account is ready when you are."}

            ticketTitle="MEMBER PASS"
        >
            <FormikProvider value={formik}>
                <form noValidate onSubmit={formik.handleSubmit} className="flex flex-col gap-4.5">
                    <FormField name="username" label="Username" autoComplete="username"/>
                    <FormField name="password" label="Password" type="password" autoComplete="current-password"/>

                    {formik.status && <p role="alert" className="text-sm font-bold text-danger">{formik.status}</p>}

                    <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="mt-1 h-15 rounded-full bg-orange text-white border-4 border-sticker text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">Log In</button>

                    <div className="flex flex-col items-center gap-1 text-sm text-center">
                        <p>No account yet? <Link to="/register" state={{from}} className="inline-block px-1.5 -mx-1.5 py-3.5 -my-3.5 font-extrabold underline hover:text-accent">Register</Link></p>
                        <Link to="/forgot-password" state={{from}} className="inline-block px-1.5 py-3.5 -my-1.5 font-extrabold underline hover:text-accent">Forgot password?</Link>
                    </div>
                </form>
            </FormikProvider>
        </AuthShell>
    )
}
