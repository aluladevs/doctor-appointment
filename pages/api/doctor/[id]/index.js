import createHandler from "../../../../lib/middleware";
import {Doctor, User} from "../../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    const { id } = req.query;

    const doctor = await Doctor.findOne({ uid: id }).populate('user').populate('specialization');

    return res.status(200).json(doctor);
});

handler.patch(async (req, res) => {
    const { id } = req.query;

    await Doctor.findOneAndUpdate({uid: id}, req.body);

    return res.status(200).json({
        message: "Successfully updated data."
    });
});

handler.delete(async (req, res) => {
    const { id } = req.query;

    // const doctor = await Doctor.findById(id);

    const doctor = await Doctor.findByIdAndDelete(id);
    // await User.findOneAndDelete({ _id: doctor.user });

    return res.status(200).json({
        data: doctor,
        message: "Successfully deleted data."
    });
})

export default handler;