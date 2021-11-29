import createHandler from "../../../lib/middleware";
import {Appointment} from "../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.query;

    const result = await Appointment.findOne(id);

    return res.status(200).json(result);
});

handler.patch(async (req, res) => {
    const { id } = req.query;

    await Appointment.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    });
});

handler.delete(async (req, res) => {
    const { id } = req.query;

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    })
});

export default handler;