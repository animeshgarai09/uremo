import * as z from "zod"

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: "Please select an account to display.",
        })
        .email(),
    password: z.string({
        required_error: "Please select an account to display.",
    }),
})

export const RegisterSchema = z.object({
    email: z
        .string({
            required_error: "Please select an account to display.",
        })
        .email(),
    password: z.string({
        required_error: "Please select an account to display.",
    }),
    name: z.string({
        required_error: "Please select an account to display.",
    }),
})
