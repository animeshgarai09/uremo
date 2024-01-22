"use server"
import { RegisterSchema } from "@/lib/schema"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
    const validatedFields: any = await RegisterSchema.safeParseAsync(await req.json())
    if (!validatedFields.success) {
        console.log("hello ")
    }
    const { name, email, password } = validatedFields.data
    const hashPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return NextResponse.json({ error: "Email already in use!" })
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
    })
    return NextResponse.json({ msg: "Success" })
}
