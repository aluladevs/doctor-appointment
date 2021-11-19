import User from "../../../models/user";
import createHandler from "../../../lib/middleware";

const handler = createHandler();

handler.get(async (req, res) => {
    const users = await User.find({});
    console.log(users)
    return res.status(200).json(users)
});

export default handler;