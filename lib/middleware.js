import nextConnect from "next-connect";
import database from "./database";
import {Department, User, Doctor} from "../models";
import {DEPARTMENTS, DOCTORS, USERS} from "../constants/default";
import ShortUniqueId from "short-unique-id";
import {generatePassword} from "./password";

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
            const departments = await Department.find({});
            const doctors = await Doctor.find({});

            if (users.length === 0) {
                const datas = [];
                for (const item of USERS) {
                    const uid = new ShortUniqueId({ length: 8 });
                    datas.push({
                        ...item,
                        password: await generatePassword(item.password),
                        uid: uid()
                    });
                }

                await User.insertMany(await Promise.all(datas));
            }

            if (departments.length === 0) {
                await Department.insertMany(DEPARTMENTS);
            }

            if (doctors.length === 0) {
                await Doctor.insertMany(DOCTORS);
            }

            next();
        });
}