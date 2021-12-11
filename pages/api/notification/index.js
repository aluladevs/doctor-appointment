import {Notification} from "../../../models";
import createHandler from "../../../lib/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
    const { user } = req.query;

    const results = await Notification.find({
        ...(user && {
            user: user
        })
    }).populate('relatedUser').populate('user');

    return res.status(200).json({
        data: results
    });
});

handler.post(async (req, res) => {
    await Notification.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully updated data."
    });
});

export default handler;