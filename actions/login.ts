"use server"
import * as z from "zod"
import { LoginSchema } from "@/lib/schema"
import { signIn } from "@/auth"
import { DEFAULT_REDIRECT_PATH } from "@/routes"
import { AuthError } from "next-auth"
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const val = LoginSchema.safeParse(values)
    if (!val.success) {
        return { error: "inval" }
    }
    const { email, password } = val.data
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_PATH,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "wrong" }
            }
        }
        throw error
    }
}
