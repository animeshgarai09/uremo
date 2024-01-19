"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FaMinus } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCounter } from "@uidotdev/usehooks"
const FormSchema = z.object({
    email: z
        .string({
            required_error: "Please select an account to display.",
        })
        .email(),
})

export function PurchaseFormCard() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("close")
    }
    const [count, { increment, decrement, set, reset }] = useCounter(1, {
        min: 1,
        max: 10,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3 '>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <>
                            <FormItem>
                                <FormLabel>Account type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select an account' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='m@example.com'>Chemistry</SelectItem>
                                        <SelectItem value='m@google.com'>Coding</SelectItem>
                                        <SelectItem value='m@support.com'>Life science</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select country' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='m@example.com'>India</SelectItem>
                                        <SelectItem value='m@google.com'>USA</SelectItem>
                                        <SelectItem value='m@support.com'>Kenya</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />
                <div className='flex justify-between mt-3'>
                    <div className='flex  items-center'>
                        <Button variant='outline' size='icon' type='button' onClick={decrement}>
                            <FaMinus className='h-4 w-4' />
                        </Button>
                        <span className='text-lg mx-5'>{count}</span>
                        <Button variant='outline' size='icon' type='button' onClick={increment}>
                            <FaPlus className='h-4 w-4' />
                        </Button>
                    </div>
                    <Button type='submit'>Get cheapest price</Button>
                </div>
            </form>
        </Form>
    )
}
