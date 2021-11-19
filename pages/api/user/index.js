import User from "../../../models/user";
import createHandler from "../../../lib/middleware";
import ShortUniqueId from "short-unique-id";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await User.find({});

    return res.status(200).json(users)
});

handler.post(async (req, res) => {

});

export default handler;