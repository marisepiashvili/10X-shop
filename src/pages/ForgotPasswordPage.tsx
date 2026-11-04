import { Form, Formik, type FormikHelpers } from "formik"
import { Link, useLocation, useNavigate } from "react-router"
import AuthShell from "../components/auth/AuthShell"
import FormField from "../components/auth/FormField"
import { resetPasswordSchema, type ResetPasswordFormValues } from "../components/auth/authSchemas"
import { AccountError, resetPassword } from "../components/auth/authStorage"
import useToast from "../hooks/useToast"

const initialValues: ResetPasswordFormValues = { username: "", email: "", password: "", confirmPassword: "" }

export default function ForgotPasswordPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { showToast } = useToast()
    const from = (location.state as { from?: string } | null)?.from ?? "/"

    // async so Formik resets isSubmitting after a failed attempt (see LoginPage)
    async function handleSubmit(values: ResetPasswordFormValues, { setFieldError }: FormikHelpers<ResetPasswordFormValues>) {
        try {
            resetPassword(values.username.trim(), values.email.trim().toLowerCase(), values.password)
            showToast("Password updated ✓")
            navigate("/login", { state: { from } })
        } catch (error) {
            if (error instanceof AccountError) setFieldError(error.field, error.message)
            else setFieldError("username", "Could not reset the password")
        }
    }

    return (
        <AuthShell
            note="it happens ✶"
            title="Reset password"
            text="Confirm your username and email, then pick a new password."
            ticketTitle="NEW PASS"
        >
            <Formik initialValues={initialValues} validationSchema={resetPasswordSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form noValidate className="flex flex-col gap-4.5">
                        <FormField name="username" label="Username" autoComplete="username" />
                        <FormField name="email" label="Email" type="email" autoComplete="email" />
                        <FormField name="password" label="New password" type="password" autoComplete="new-password" />
                        <FormField name="confirmPassword" label="Confirm new password" type="password" autoComplete="new-password" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-1 h-15 rounded-full bg-orange text-white border-4 border-sticker text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Update password
                        </button>

                        <p className="text-sm text-center">Remembered it? <Link to="/login" state={{ from }} className="inline-block px-1.5 -mx-1.5 py-3.5 -my-3.5 font-extrabold underline hover:text-accent">Log in</Link></p>
                    </Form>
                )}
            </Formik>
        </AuthShell>
    )
}
