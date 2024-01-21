import { Schema, model, models } from "mongoose"

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "Email already exists"],
            required: [true, "Email is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            // match
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            // match
        },
        emailVerified: {
            type: Date,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: "GUEST",
            enum: ["GUEST", "SCREENER", "TASKER", "MANAGER", "ADMIN", "SUPERADMIN"],
        },
        accounts: {
            type: [Schema.Types.ObjectId],
        },
        onBoarded: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    {
        timestamps: true,
    }
)

const users = models?.users || model("users", UserSchema)
export default users
