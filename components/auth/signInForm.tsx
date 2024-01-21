"use client"

import React from "react"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { DEFAULT_REDIRECT_PATH, REGISTER } from "@/routes"
import { LoginSchema } from "@/lib/schema"
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}
import { useTransition } from "react"
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
export default function SignInForm({ className, ...props }: SignInFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const [isPending, startTransition] = useTransition()

    const onClick = (provider: "google" | "discord") => {
        signIn(provider, {
            callbackUrl: DEFAULT_REDIRECT_PATH,
        })
    }
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        // setError("")
        // setSuccess("")

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        console.log("failed")
                    }
                })
                .catch(() => {
                    console.log("failed")
                })
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='name@example.com' type='email' autoCapitalize='none' autoComplete='email' autoCorrect='off' disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='********' type='password' autoCapitalize='none' autoComplete='email' autoCorrect='off' disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <Button type='submit' className='w-full mt-6' disabled={isLoading}>
                        Sign In with Email
                    </Button>
                </form>
            </Form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Button asChild variant='outline' type='button' disabled={isLoading}>
                    <Link href={REGISTER}>Create Account</Link>
                </Button>
                <Button variant='outline' onClick={() => onClick("discord")} type='button' disabled={isLoading}>
                    Discord
                </Button>
                <Button variant='outline' onClick={() => onClick("google")} type='button' disabled={isLoading}>
                    Google
                </Button>
            </div>
        </div>
    )
}
