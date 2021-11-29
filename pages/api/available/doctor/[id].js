import createHandler from "../../../../lib/middleware";
import {Available, User} from "../../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    let { id } = req.query;

    const data = await User.findOne({ uid: id });

    const results = await Available.find({ doctor: data._id });

    return res.status(200).json({
        data: results
    })
});

export default handler;