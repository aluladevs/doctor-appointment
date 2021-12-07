import mongoose from "mongoose";

const SpecializationSchema = new mongoose.Schema({
    name: { type: String, text: true }
});

export const Specialization = mongoose.models.Specialization || mongoose.model('Specialization', SpecializationSchema);
