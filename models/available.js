import mongoose from "mongoose";

const AvailableSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    slots: [
        {
            start: String,
            end: String
        }
    ]
}, { timestamps: true });

export const Available = mongoose.models.Available || mongoose.model('Available', AvailableSchema);
