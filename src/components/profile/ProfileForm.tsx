import { Form, Formik, type FormikHelpers } from "formik"
import useAuth from "../../hooks/useAuth"
import { profileSchema, type ProfileFormValues } from "../auth/authSchemas"
import type { AuthUser } from "../auth/authStorage"
import FormField from "../auth/FormField"

export default function ProfileForm({ user }: { user: AuthUser }) {
  const { updateProfile } = useAuth()
  const initialValues: ProfileFormValues = { name: user.name, email: user.email, phone: user.phone ?? "" }

  function handleSubmit(values: ProfileFormValues, { resetForm, setFieldError }: FormikHelpers<ProfileFormValues>) {
    const cleaned = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone?.trim() ?? "",
    }
    try {
      updateProfile(cleaned)
      resetForm({ values: cleaned, status: "saved" })
    } catch (error) {
      setFieldError("email", error instanceof Error ? error.message : "Could not save changes")
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={profileSchema} onSubmit={handleSubmit}>
      {({ dirty, status }) => (
        <Form noValidate className="p-6 md:p-8 flex flex-col gap-5.5 bg-white rounded-card shadow-card">
          <h2 className="font-display text-[28px] leading-tight">Personal details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            <div className="sm:col-span-2">
              <FormField name="name" label="Name" autoComplete="name" />
            </div>
            <FormField name="email" label="Email" type="email" autoComplete="email" />
            <FormField name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!dirty}
              className="h-14 px-7 rounded-full bg-ink text-white text-[17px] font-extrabold transition enabled:hover:bg-blue disabled:bg-muted disabled:text-muted-ink disabled:cursor-not-allowed"
            >
              Save changes
            </button>
            {status === "saved" && !dirty && (
              <p role="status" className="font-note text-2xl text-blue">saved! ✶</p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
