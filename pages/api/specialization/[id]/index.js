import createHandler from "../../../../lib/middleware";
import {Specialization} from "../../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.query;

    const result = await Specialization.findOne({id});

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { id } = req.query;

    const result = await Specialization.findOneAndUpdate({id}, req.body);

    return res.status(200).json(result);
});

handler.delete(async (req, res) => {
    const { id } = req.query;

    await Specialization.findOneAndDelete({ _id: id });

    return res.status(200).json({
        message: "Successfully deleted data."
    });
})

export default handler;