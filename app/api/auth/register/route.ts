import { RegisterSchema } from "@/lib/schema"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import users from "@/models/users"
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
    const validatedFields: any = await RegisterSchema.safeParseAsync(await req.json())
    if (!validatedFields.success) {
        console.log("hello ")
    }
    const { name, email, password } = validatedFields.data
    const hashPassword = await bcrypt.hash(password, 10)
    await connectDB()

    await users.create({
        name,
        email,
        password: hashPassword,
    })
    return NextResponse.json({ msg: "Success" })
}
