import User from "../../../models/user";
import createHandler from "../../../lib/middleware";
import ShortUniqueId from "short-unique-id";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.params;

    const result = await User.findOne(id);

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    });
});

handler.delete(async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    })
});

export default handler;