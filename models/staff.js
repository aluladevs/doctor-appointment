import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: { type: String, text: true },
    phoneCode: Object,
    contact: Number,
    birthday: String,
    gender: String,
    address: String,
    city: String,
    country: Object,
    status: {
        type: Number,
        default: 1
    }
});

export const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
