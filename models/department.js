import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true
    }
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
