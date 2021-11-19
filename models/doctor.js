import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    experience: Number
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
