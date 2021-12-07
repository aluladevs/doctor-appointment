import createHandler from "../../../lib/middleware";
import {Specialization, User} from "../../../models";

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

    const results = await Specialization
        .find(query)
        .skip(skip)
        .limit(limit ? parseInt(limit) : 0)
        .sort(sortBy);

    const counts = await Specialization.countDocuments(query);

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
    await Specialization.create(req.body);

    return res.status(200).json({
        message: "Successfully added data."
    });
});

export default handler;