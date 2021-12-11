import {Setting} from "../../models";
import createHandler from "../../lib/middleware";

const handler = createHandler();

handler.patch(async (req, res) => {
    const { id } = req.query;

    await Setting.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully updated data."
    });
});