import {Doctor, User} from "../../../models";
import createHandler from "../../../lib/middleware";
import Roles from "../../../constants/role";
import ShortUniqueId from "short-unique-id";
import {generatePassword} from "../../../lib/password";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await User.find({ role: { $in: [Roles.doctor.value]}});

    return res.status(200).json(users)
});

handler.post(async (req, res) => {
    let params = req.body;
    const uid = new ShortUniqueId({ length: 8 });

    params.password = await generatePassword(params.password);
    params.uid = uid();

    const result = await User.create(params);

    await Doctor.create({
        userId: result._id,
        departmentId: params.department,
        experience: params.experience
    });

    return res.status(200).json(result);
});

export default handler;