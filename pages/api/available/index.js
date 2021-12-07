import createHandler from "../../../lib/middleware";
import {Available} from "../../../models";

const handler = createHandler();

handler.post(async (req, res) => {
    await Available.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully added data."
    });
});

export default handler;