import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useNavigate } from "react-router"
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
        <section className="max-w-md mx-auto my-10 px-4">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
                {({isSubmitting, status}) => (
                    <Form noValidate>
                        <fieldset className="flex flex-col gap-4 border-2 border-[#12424A] rounded-2xl p-4 text-[#12424A]">
                            <legend className="px-3 py-1 rounded-md bg-[#12424A] text-white text-sm font-bold uppercase">Log in</legend>

                            <FormField name="email" label="Email" type="email" autoComplete="email"/>
                            <FormField name="password" label="Password" type="password" autoComplete="current-password"/>

                            {status && <p role="alert" className="text-sm text-red-600">{status}</p>}

                            <button  
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 rounded-full border-2 border-[#12424A] bg-[#B5E655] text-lg transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[3px_3px_0_#12424A] disabled:opacity-60 disabled:cursor-not-allowed">Log in</button>

                            <p className="text-sm text-center"> No account yet? <Link to="/register" className="font-bold underline">Register</Link></p>
                        </fieldset>
                    </Form>
                )}
            </Formik>
        </section>
    )
}