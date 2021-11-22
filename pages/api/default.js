import createHandler from "../../lib/middleware";
import User from "../../models/user";
import Department from "../../models/department";
import Doctor from "../../models/doctor";
import {DEPARTMENTS, DOCTORS, USERS} from "../../constants/default";
import {generatePassword} from "../../lib/password";
import ShortUniqueId from "short-unique-id";

const handler = createHandler();

handler.get(async (req, res) => {
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

        User.insertMany(await Promise.all(datas));
    }

    if (departments.length === 0) {
        Department.insertMany(DEPARTMENTS);
    }

    if (doctors.length === 0) {
        Doctor.insertMany(DOCTORS);
    }

    return res.status(200).json({
        success: true,
        message: "Successfully added default data."
    })
});

export default handler;