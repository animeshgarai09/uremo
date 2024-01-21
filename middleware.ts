import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_REDIRECT_PATH, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = Object.values(publicRoutes).includes(nextUrl.pathname)
    const isauthRoutes = Object.values(authRoutes).includes(nextUrl.pathname)
    console.log(nextUrl.pathname)
    if (isApiAuthRoute) {
        return null
    }

    if (isauthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_PATH, nextUrl))
        }
        return null
    }
    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL(authRoutes.SIGN_IN, nextUrl))
    }
    return null
})
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
