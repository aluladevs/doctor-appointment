import {User} from "../../../models";
import createHandler from "../../../lib/middleware";
import ShortUniqueId from "short-unique-id";
import {generatePassword} from "../../../lib/password";

const handler = createHandler();

handler.get(async (req, res) => {
    const { keyword, sort, role, limit, page } = req.query;
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

    if (role) {
        query.role = role;
    }

    const results = await User
        .find(query)
        .skip(skip)
        .limit(limit ? parseInt(limit) : 0)
        .sort(sortBy);

    const counts = await User.countDocuments(query);

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

    params.password = await generatePassword(params.password);
    params.uid = new ShortUniqueId({ length: 8 });

    const result = await User.create(params);

    return res.status(200).json(result);
});

export default handler;