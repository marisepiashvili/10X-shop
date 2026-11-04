import {object, ref, string, type InferType} from "yup"

// required() comes first in every chain: Yup reports the first failing rule,
// so an empty field must hit "is required" before any length rule

const email = string().trim().required("Email is required").email("Enter a valid email")

const username = string().trim().required("Username is required")

const newPassword = string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain a letter")
    .matches(/\d/, "Password must contain a number")

const confirmPassword = string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords must match")

export const loginSchema = object({
    username,
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
})

export const registerSchema = object({
    username: username.min(3, "Username must be at least 3 characters").matches(/^\S+$/, "Username cannot contain spaces"),
    name: string().trim().required("Name is required").min(2, "Name must be at least 2 characters"),
    email,
    password: newPassword,
    confirmPassword,
})

export const resetPasswordSchema = object({
    username,
    email,
    password: newPassword,
    confirmPassword,
})

export const profileSchema = object({
    firstName: string().trim().required("First name must be at least 2 characters").min(2, "First name must be at least 2 characters"),
    lastName: string().trim().required("Last name must be at least 2 characters").min(2, "Last name must be at least 2 characters"),
    email: string().trim().required("Please enter a valid email address").email("Please enter a valid email address"),
    // 9-15 digits, optional leading +, spaces or hyphens between digits
    phone: string().trim().matches(/^\+?(?:\d[\s-]?){8,14}\d$/, { message: "Please enter a valid phone number", excludeEmptyString: true }),
})

export type ProfileFormValues = InferType<typeof profileSchema>
export type LoginFormValues = InferType<typeof loginSchema>
export type RegisterFormValues = InferType<typeof registerSchema>
export type ResetPasswordFormValues = InferType<typeof resetPasswordSchema>
