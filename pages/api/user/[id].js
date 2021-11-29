import {Doctor, User} from "../../../models";
import createHandler from "../../../lib/middleware";
import Roles from "../../../constants/role";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.query;

    let result = await User.findById(id);

    if (result.role.includes(Roles.doctor.value)) {
        result._doc.doctor = await Doctor.findOne({ userId: id });
    }

    result.password = "";

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { id } = req.query;

    await User.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    });
});

handler.delete(async (req, res) => {
    const { id } = req.query;

    await User.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    })
});

export default handler;