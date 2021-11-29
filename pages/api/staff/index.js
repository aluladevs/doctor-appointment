import {User} from "../../../models";
import createHandler from "../../../lib/middleware";
import Roles from "../../../constants/role";
import ShortUniqueId from "short-unique-id";
import {generatePassword} from "../../../lib/password";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await User.find({ role: { $in: [Roles.staff.value]}});

    return res.status(200).json(users)
});

handler.post(async (req, res) => {
    let params = req.body;
    const uid = new ShortUniqueId({ length: 8 });

    params.password = await generatePassword(params.password);
    params.uid = uid();

    const result = await User.create(params);

    return res.status(200).json(result);
});

export default handler;