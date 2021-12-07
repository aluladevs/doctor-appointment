import nextConnect from "next-connect";
import database from "./database";
import {Specialization, User, Doctor, Staff, Patient} from "../models";
import {SPECIALIZATIONS, DOCTORS, USERS, PATIENTS, STAFFS} from "../constants/default";
import ShortUniqueId from "short-unique-id";
import {generatePassword} from "./password";
import Roles from "../constants/role";
import {generateId} from "./id";

export default function createHandler() {
    return nextConnect({
        onError: (err, req, res, next) => {
            console.error(err.stack);
            res.status(500).end("Something broke!");
        },
        onNoMatch: (req, res, next) => {
            res.status(404).end("Page is not found");
        }
    })
        .use(database)
        .get(async (req, res, next) => {
            const users = await User.find({});
            const specializations = await Specialization.find({});

            if (users.length === 0) {
                const datas = [];
                for (const item of USERS) {
                    datas.push({
                        ...item,
                        password: await generatePassword(item.password)
                    });

                    if (item.role.includes(Roles.doctor.value)) {
                        await Doctor.insertMany(DOCTORS);
                    }

                    if (item.role.includes(Roles.patient.value)) {
                        await Patient.insertMany(PATIENTS);
                    }

                    if (item.role.includes(Roles.staff.value)) {
                        await Staff.includes(STAFFS);
                    }
                }

                await User.insertMany(await Promise.all(datas));
            }

            if (specializations.length === 0) {
                await Specialization.insertMany(SPECIALIZATIONS);
            }

            next();
        });
}