import createHandler from "../../../lib/middleware";
import {Appointment, Doctor, Notification} from "../../../models";
import moment from "moment";
import nodemailer from "nodemailer";
import transporter from "../../../lib/mail";


const handler = createHandler();

handler.get(async (req, res) => {
    const { keyword, sort, limit, page } = req.query;
    let query = {};
    let sortBy = { createdAt: -1 };
    let skip = 0;

    if (limit && page) {
        skip = parseInt(limit) * (page - 1);
    }

    if (keyword) {
        query.name = { '$regex': '.*' + keyword + '.*', '$options': '$i' };
        query.email = { '$regex': '.*' + keyword + '.*', '$options': '$i' }
    }

    if (sort) {
        const field = sort.split(',');

        sortBy = { [field[0]]: field[1] };
    }

    const results = await Appointment
        .find(query)
        .skip(skip)
        .limit(limit ? parseInt(limit) : 0)
        .sort(sortBy)
        .populate('doctor');

    const counts = await Appointment.countDocuments(query);

    return res.status(200).json({
        query: { ...query, sort: sortBy },
        pagination: {
            limit: limit ?? 20,
            page: page ?? 1,
            pages: Math.ceil(counts / (limit ?? 20))
        },
        data: results
    });
});

handler.post(async (req, res) => {
    let params = req.body;

    const result = await Appointment.create(params);
    const {user} = await Doctor.findById(result.doctor);

    await Notification.create({
        user: user._id,
        title: `New appointment`,
        description: `${user.name} have new appointment on ${moment(result.date).format('DD MMMM')} at ${result.slot?.start}`
    });

    const mailData = {
        from: process.env.MAIL_USER,
        to: result.email,
        subject: "Endkindle - Appointment Confirmation",
        text: `You have made appointment with ${user.name} on ${moment(result.date).format('DD MMMM')} at ${result.slot?.start}`,
    //     html: `<div>${req.body.message}</div><p>Sent from:
    // ${req.body.email}</p>`
    }

    await transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info)
    });

    return res.status(200).json(result);
});

export default handler;