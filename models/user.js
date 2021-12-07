import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, text: true },
    email: { type: String, text: true },
    password: { type: String, required: true },
    role: Array,
    avatar: String,
    status: {
        type: Number,
        default: 1
    }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
