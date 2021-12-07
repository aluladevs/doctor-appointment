import {
    BeakerIcon, CalendarIcon,
    ClipboardIcon,
    ClipboardListIcon, CogIcon,
    HomeIcon,
    IdentificationIcon, TemplateIcon,
    UsersIcon
} from "@heroicons/react/solid";
import Roles from "./role";

const Menus = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: HomeIcon
    },
    {
        name: "Specialization",
        path: "/specialization",
        icon: TemplateIcon,
        roles: [Roles.admin.value]
    },
    {
        name: "User",
        path: "/user",
        icon: UsersIcon,
        roles: [Roles.admin.value, Roles.staff.value]
    },
    {
        name: "Doctor",
        path: "/doctor",
        icon: BeakerIcon,
        roles: [Roles.admin.value, Roles.staff.value]
    },
    {
        name: "Patient",
        path: "/patient",
        icon: ClipboardIcon,
        roles: [Roles.admin.value, Roles.staff.value]
    },
    {
        name: "Staff",
        path: "/staff",
        icon: IdentificationIcon,
        roles: [Roles.admin.value]
    },
    {
        name: "Appointment",
        path: "/appointment",
        icon: ClipboardListIcon
    },
    {
        name: "Available Slot",
        path: "/available",
        icon: CalendarIcon,
        roles: [Roles.doctor.value]
    },
    {
        name: "Setting",
        path: "/setting",
        icon: CogIcon,
        roles: [Roles.admin.value]
    },
];

export default Menus;