import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
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
    status: {
        type: Number,
        default: 1
    }
});

export const Patient = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
