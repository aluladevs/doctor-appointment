import createHandler from "../../../lib/middleware";
import {Appointment} from "../../../models";
import moment from "moment";
import transporter from "../../../lib/mail";

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

    const result = await Appointment.findByIdAndDelete(id);

    const mailData = {
        from: process.env.MAIL_USER,
        to: result.email,
        subject: "Endkindle - Appointment Cancelation",
        text: `Your appointment with ${result.doctor?.name} on ${moment(result.date).format('DD MM')} at ${result.slot?.start} has been canceled.`,
        //     html: `<div>${req.body.message}</div><p>Sent from:
        // ${req.body.email}</p>`
    }

    await transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info)
    });

    return res.status(200).json({
        success: true,
        message: "Successfully deleted data."
    })
});

export default handler;