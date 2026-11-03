import {object, ref, string, type InferType} from "yup"

const email = string().trim().email("Enter a valid email").required("Email is required")

export const loginSchema = object({
    email,
    password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
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

export const profileSchema = object({
    firstName: string().trim().min(2, "First name must be at least 2 characters").required("First name must be at least 2 characters"),
    lastName: string().trim().min(2, "Last name must be at least 2 characters").required("Last name must be at least 2 characters"),
    email: string().trim().email("Please enter a valid email address").required("Please enter a valid email address"),
    // 9-15 digits, optional leading +, spaces or hyphens between digits
    phone: string().trim().matches(/^\+?(?:\d[\s-]?){8,14}\d$/, { message: "Please enter a valid phone number", excludeEmptyString: true }),
})

export type ProfileFormValues = InferType<typeof profileSchema>
export type LoginFormValues = InferType<typeof loginSchema>
export type RegiterFormValues = InferType<typeof registerSchema>