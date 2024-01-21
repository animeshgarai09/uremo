import { Schema, model, models } from "mongoose"

const VerificationTokenSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    token: {
        type: String,
        unique: [true, "Token already exists"],
        required: [true, "Token is required"],
    },
    expires: {
        type: Date,
        required: [true, "Expiry date is required"],
    },
})

const verificationTokensSchema = models?.VerificationTokenSchema || model("verificationToken", VerificationTokenSchema)
export default verificationTokensSchema
