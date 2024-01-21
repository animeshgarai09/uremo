import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import authConfig from "./auth.config"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    callbacks: {
        async session({ token, session }) {
            session.user = token.user
            // console.log("session", token)
            return Promise.resolve(session)
        },
        async jwt({ token, user, profile }) {
            if (user) token.user = user
            return Promise.resolve(token)
        },
    },
    adapter: MongoDBAdapter(clientPromise, { databaseName: "uremo" }),
})
