import createHandler from "../../../../lib/middleware";
import {Available, Doctor} from "../../../../models";

const handler = createHandler();

handler.get(async (req, res) => {
    const { doctor } = req.query;

    const doctorInfo = await Doctor.findOne({ uid: doctor });

    if (!doctorInfo) {
        return res.status(200).json({
            failed: true,
            message: "Data not found!"
        });
    }

    const results = await Available.find({doctorId: doctorInfo._id});

    return res.status(200).json({
        data: results
    });
});

export default handler;