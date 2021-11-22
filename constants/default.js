import Roles from "./role";
import * as mongoose from "mongoose";

export const USERS = [
    {
        name: "Admin",
        email: "admin@endkindle.com",
        password: "123456789",
        role: [Roles.admin.value]
    },
    {
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
        name: "Melody",
        email: "melody@example.com",
        password: "987654321",
        role: [Roles.patient.value]
    },
];

export const DEPARTMENTS = [
    { _id: mongoose.Types.ObjectId("619a3540d181b44e825a7e8d"), name: "Dentist" },
    { name: "Cardiology" },
    { name: "Dermatology" },
    { name: "Gynecology" }
];

export const DOCTORS = [
    {
        userId: "619a34f63de43fd677f80761",
        departmentId: "619a3540d181b44e825a7e8d",
        experience: 10
    }
];