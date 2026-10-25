import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useNavigate } from "react-router"
import AuthShell from "../components/auth/AuthShell"
import FormField from "../components/auth/FormField"
import { loginSchema, type LoginFormValues } from "../components/auth/authSchemas"
import { loginUser } from "../components/auth/authStorage"

const initialValues : LoginFormValues = {email: "", password:""}

export default function LoginPage (){
    const navigate = useNavigate()

    async function handleSubmit(values: LoginFormValues, {setStatus} : FormikHelpers<LoginFormValues>) {

        try{
            loginUser(values.email.trim().toLowerCase(), values.password)
            navigate("/")
        }catch (error){
            setStatus(error instanceof Error ? error.message : "Login failed")
        }
        
    }
    return(
        <AuthShell
            note="welcome back ✶"
            title="Log in & check out"
            text="One quick step and your order is on its way."
            ticketTitle="MEMBER PASS"
        >
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
                {({isSubmitting, status}) => (
                    <Form noValidate className="flex flex-col gap-4.5">
                        <FormField name="email" label="Email" type="email" autoComplete="email"/>
                        <FormField name="password" label="Password" type="password" autoComplete="current-password"/>

                        {status && <p role="alert" className="text-sm font-bold text-danger">{status}</p>}

                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-1 h-15 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">Log in</button>

                        <p className="text-sm text-center">No account yet? <Link to="/register" className="font-extrabold underline hover:text-blue">Register</Link></p>
                    </Form>
                )}
            </Formik>
        </AuthShell>
    )
}