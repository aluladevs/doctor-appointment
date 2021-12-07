import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    uid: String,
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
    experience: Number,
    specialization: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Specialization"
        }
    ],
    status: {
        type: Number,
        default: 1
    }
});

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);