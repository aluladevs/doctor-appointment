import {User} from "../../../models";
import createHandler from "../../../lib/middleware";
import {generatePassword} from "../../../lib/password";
import {Patient} from "../../../models/patient";
import {generateId} from "../../../lib/id";
import Roles from "../../../constants/role";

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

    const results = await Patient
        .find(query)
        .skip(skip)
        .limit(limit ? parseInt(limit) : 0)
        .sort(sortBy)
        .populate('user');

    const counts = await Patient.countDocuments(query);

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
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
        return res.status(200).json({
            failed: true,
            message: "Email address already exists. Try another!"
        });
    }

    const password = await generatePassword(req.body.password);

    const user = await User.create({
        ...req.body,
        role: [Roles.patient.value],
        password: password
    });

    const uid = generateId();
    const params = {
        ...req.body,
        uid,
        user: user._id,
        name: req.body.name || user.name
    };

    await Patient.create(params);

    return res.status(200).json({
        success: true,
        message: "Successfully added data."
    });
});

export default handler;