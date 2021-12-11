import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
    about: String,
    phoneCode: Object,
    contact: Number,
    address: String,
    city: String,
    country: Object
});

export const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
