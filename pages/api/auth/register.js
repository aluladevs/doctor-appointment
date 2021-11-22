import User from "../../../models/user";
import createHandler from "../../../lib/middleware";
import {generatePassword} from "../../../lib/password";
import Roles from "../../../constants/role";
import ShortUniqueId from "short-unique-id";

const handler = createHandler();

handler.post(async (req, res) => {
    const params  = req.body;

    const user = await User.findOne({ email: params.email });

    if (user) {
        return res.status(401).send({
            failed: true,
            message: "User already registered. Try to login!"
        });
    }

    params.password = await generatePassword(params.password);
    params.role = [Roles.patient.value];
    params.uid = new ShortUniqueId({ length: 8 });

    const result = await User.create(params);

    return res.status(200).json(result)
});

export default handler;