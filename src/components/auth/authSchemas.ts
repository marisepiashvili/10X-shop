import {object, ref, string, type InferType} from "yup"

const email = string().trim().email("Enter a valid email").required("Email is required")

export const loginSchema = object({
    email,
    password: string().required("Password is required"),
})

export const registerSchema = object({
    name: string().trim().min(2, "Name must be at least 2 characters").required("Name is required"),
    email,
    password: string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain a letter")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
    confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
})

export type LoginFormValues = InferType<typeof loginSchema>
export type RegiterFormValues = InferType<typeof registerSchema>