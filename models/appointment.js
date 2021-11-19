import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    date: Date,
    slot: Object
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
