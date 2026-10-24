import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useNavigate } from "react-router"
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
   <section className="max-w-md mx-auto my-10 px-4">
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
            <Form noValidate>
                <fieldset className="flex flex-col gap-4 border-2 border-[#12424A] rounded-2xl p-4 text-[#12424A]">
                    <legend className="px-3 py-1 rounded-md bg-[#12424A] text-white text-sm font-bold uppercase" >
                        Register
                        </legend>
                    
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
                    className="h-11 rounded-full border-2 border-[#12424A] bg-[#B5E655] text-lg transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[3px_3px_0_#12424A] disabled:opacity-60 disabled:cursor-not-allowed">
                        Create account</button>

                    <p className="text-sm text-center">Already have an account? <Link to="/login" className="font-bold underline">Log in</Link></p>
                </fieldset>
            </Form>
        )}
    </Formik>
   </section>
  )
}
