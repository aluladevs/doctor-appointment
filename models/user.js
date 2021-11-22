import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: String,
    uid: String,
    name: { type: String, text: true },
    email: { type: String, text: true },
    password: { type: String, required: true },
    contact: Number,
    birthday: Date,
    gender: String,
    address: String,
    city: String,
    country: String,
    role: Array,
    status: {
        type: Number,
        default: 0
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

