import moment from "moment";
import createHandler from "../../../lib/middleware";
import {Available, User} from "../../../models";
import Roles from "../../../constants/role";

const handler = createHandler();

handler.get(async (req, res) => {
    let { sort, limit, page, doctor } = req.query;
    let query = {};
    let sortBy = { createdAt: -1 };
    let skip = 0;

    if (limit && page) {
        skip = parseInt(limit) * (page - 1);
    }

    if (sort) {
        const field = sort.split(',');

        sortBy = { [field[0]]: field[1] };
    }

    if (doctor) {
        query.doctor = doctor;
    }

    let doctors = await User.find({ role: { $in: [Roles.doctor.value]}});

    if (doctor) {
        doctor = doctor.split(',');

        doctors = doctors.filter(e => doctor.includes(e._id));
    }

    const result = [];

    await Promise.all(doctors.map(async (item) => {
        const available = await Available.find({ doctor: item._id });
        result.push({
            doctor: item,
            slots: available
        });
    }));

    const counts = await Available.countDocuments(query);

    return res.status(200).json({
        query: { ...query, sort: sortBy },
        pagination: {
            limit: limit ?? 20,
            page: page ?? 1,
            pages: Math.ceil(counts / (limit ?? 20))
        },
        data: result
    });
});

handler.post(async (req, res) => {
    let params = req.body;

    const result = await Available.create(params);

    return res.status(200).json(result);
});

export default handler;