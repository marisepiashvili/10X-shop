import { object, string, type ObjectSchema } from "yup"
import type { ShippingInfo } from "../../types/order"

export const checkoutSchema: ObjectSchema<ShippingInfo> = object({
  fullName: string().trim().min(3, "Full name must be at least 3 characters").required("Full name is required"),
  email: string().trim().email("Enter a valid email").required("Email is required"),
  address: string().trim().min(5, "Address must be at least 5 characters").required("Address is required"),
  city: string().trim().required("City is required"),
})

