import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    name: String,
    email: String,
    description: String,
    phoneCode: Object,
    contact: String,
    date: Date,
    slot: Object
}, { timestamps: true });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
