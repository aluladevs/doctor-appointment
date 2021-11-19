import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    slots: Array
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
