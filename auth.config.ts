import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginSchema } from "./lib/schema"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import { getUserByEmail } from "@/data/user"

export default {
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            // profile(profile) {
            //     return {
            //         id: profile.sub,
            //         name: profile.name,
            //         email: profile.email,
            //         image: profile.picture,
            //         role: "GUEST",
            //         onBoarded: false,
            //     }
            //     // console.log("updated", updated)
            //     // return updated.toObject()
            // },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    console.log("matchpassword", passwordsMatch, user)
                    if (passwordsMatch) return user
                    // return {
                    //     id: user._id,
                    //     email: user.email,
                    //     name: user.name,
                    //     emailVerified: user.emailVerified,
                    //     image: user.image,
                    //     role: user.guest,
                    //     accounts: user.guest,
                    //     onBoarded: user.onBoarded,
                    //     createdAt: user.createdAt,
                    //     updatedAt: user.updatedAt,
                    // }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig
