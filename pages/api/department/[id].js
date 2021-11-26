import {Department} from "../../../models";
import createHandler from "../../../lib/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.params;

    const result = await Department.findOne(id);

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { id } = req.params;

    await Department.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    });
});

handler.delete(async (req, res) => {
    const { id } = req.params;

    await Department.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    })
});

export default handler;