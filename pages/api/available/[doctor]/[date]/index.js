import createHandler from "../../../../../lib/middleware";
import {Available, Doctor} from "../../../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    const { doctor, date } = req.query;

    const result = await Available.findOne({doctorId: doctor, date: date});

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { doctor, date } = req.query;

    await Available.findOneAndUpdate({doctorId: doctor, date: date}, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully added data."
    });
});

export default handler;