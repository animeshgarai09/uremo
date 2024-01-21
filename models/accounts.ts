import { Schema, model, models } from "mongoose"

export const AccountSchema = new Schema({
    userId: {
        type: String,
        required: [true, "Email is required"],
    },
    type: {
        type: String,
        default: null,
    },
    provider: {
        type: String,
        unique: [true, "Provider already exists"],
    },
    providerAccountId: {
        type: String,
        unique: [true, "providerAccountId already exists"],
    },
    refresh_token: {
        type: String,
        default: null,
    },
    access_token: {
        type: String,
        default: null,
    },
    expires_at: {
        type: Number,
        default: null,
    },
    token_type: {
        type: String,
        default: null,
    },
    scope: {
        type: String,
        default: null,
    },
    id_token: {
        type: String,
        default: null,
    },
    session_state: {
        type: String,
        default: null,
    },
})

const accounts = models?.accounts || model("accounts", AccountSchema)
export default accounts
