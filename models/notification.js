import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    relatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    read: Boolean
});

export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
