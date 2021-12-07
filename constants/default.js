import Roles from "./role";
import * as mongoose from "mongoose";
import {generateId} from "../lib/id";

export const USERS = [
    {
        name: "Admin",
        email: "admin@endkindle.com",
        password: "123456789",
        role: [Roles.admin.value]
    },
    {
        _id: mongoose.Types.ObjectId("61ac9457e5465f1191b30e04"),
        name: "Staff",
        email: "staff@endkindle.com",
        password: "123456789",
        role: [Roles.staff.value]
    },
    {
        _id: mongoose.Types.ObjectId("619a34f63de43fd677f80761"),
        name: "Dr. Jane",
        email: "drjane@endkindle.com",
        password: "123456789",
        role: [Roles.doctor.value]
    },
    {
        _id: mongoose.Types.ObjectId("61ac9468fc9dbd60911219ea"),
        name: "Melody",
        email: "melody@example.com",
        password: "987654321",
        role: [Roles.patient.value]
    },
];

export const SPECIALIZATIONS = [
    { _id: mongoose.Types.ObjectId("619a3540d181b44e825a7e8d"), name: "Dentist" },
    { name: "Cardiology" },
    { name: "Dermatology" },
    { name: "Gynecology" }
];

export const DOCTORS = [
    {
        user: "619a34f63de43fd677f80761",
        uid: generateId(),
        gender: "female",
        specialization: ["619a3540d181b44e825a7e8d"],
        experience: 10,
        status: 1
    }
];

export const STAFFS = [
    {
        user: "61ac9457e5465f1191b30e04",
        uid: generateId(),
        gender: "male",
        status: 1
    }
];

export const PATIENTS = [
    {
        user: "61ac9468fc9dbd60911219ea",
        uid: generateId(),
        gender: "female",
        status: 1
    }
];
