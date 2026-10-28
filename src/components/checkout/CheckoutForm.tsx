import { Form, Formik } from "formik"
import FormField from "../auth/FormField"
import { checkoutSchema, type ShippingInfo } from "./checkoutSchema"

const initialValues: ShippingInfo = { fullName: "", email: "", address: "", city: "" }

type CheckoutFormProps = {
  totalText: string
  onSubmit: (values: ShippingInfo) => void
}

export default function CheckoutForm({ totalText, onSubmit }: CheckoutFormProps) {
  return (
    <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={onSubmit}>
      <Form
        noValidate
        className="flex-[999_1_560px] min-w-0 p-6 md:p-8 flex flex-col gap-6 bg-white rounded-card shadow-card"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 shrink-0 rounded-full bg-yellow grid place-items-center font-display text-lg">1</span>
          <h2 className="font-display text-2xl md:text-[28px] leading-tight">Where should we ship it?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <FormField name="fullName" label="Full name" autoComplete="name" />
          </div>
          <div className="sm:col-span-2">
            <FormField name="email" label="Email" type="email" autoComplete="email" />
          </div>
          <FormField name="address" label="Address" autoComplete="street-address" />
          <FormField name="city" label="City" autoComplete="address-level2" />
        </div>

        <p className="px-5 py-3.5 rounded-[18px] bg-yellow/40 text-[15px] font-semibold leading-normal">
          No payment is taken — this is a demo store. Your order is saved on this device only.
        </p>

        <button
          type="submit"
          className="h-15 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
        >
          Place order · {totalText}
        </button>
      </Form>
    </Formik>
  )
}
