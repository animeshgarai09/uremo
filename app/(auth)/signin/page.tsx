import React from "react"
import SignInForm from "@/components/auth/signInForm"
import Link from "next/link"

const SignIn = () => {
    return (
        <div className=' min-h-[calc(100vh-150px)] w-screen flex justify-center items-center'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-6'>
                <div className='flex flex-col space-y-2 text-center'>
                    <h1 className='text-2xl font-semibold tracking-tight'>Sign In </h1>
                    <p className='text-sm text-muted-foreground'>Enter your account details </p>
                </div>
                <SignInForm />
                <p className='px-8 text-center text-sm text-muted-foreground'>
                    By clicking continue, you agree to our{" "}
                    <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignIn
