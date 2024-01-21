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
import { SIGN_IN } from "@/routes"
import Link from "next/link"
import { RegisterSchema } from "@/lib/schema"

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({ className, ...props }: RegisterFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        // event.preventDefault()
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='name@example.com' type='text' autoComplete='off' autoCorrect='off' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='name@example.com' type='email' autoCapitalize='none' autoComplete='off' autoCorrect='off' />
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
                                        <Input {...field} placeholder='********' type='password' autoCapitalize='none' autoComplete='email' autoCorrect='off' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <Button type='submit' className='w-full mt-6' disabled={isLoading}>
                        Create Account
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
                    <Link href={SIGN_IN}>Sign In</Link>
                </Button>
                <Button variant='outline' type='button' disabled={isLoading}>
                    Discord
                </Button>
                <Button variant='outline' type='button' disabled={isLoading}>
                    Google
                </Button>
            </div>
        </div>
    )
}
