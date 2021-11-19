import formidable from 'formidable';
import * as fs from "fs";
import ShortUniqueId from "short-unique-id";

const url = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const form = formidable({
        multiples: true,
        maxFileSize: 20 * 1024 * 1024
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }

        if (!files.image.length) {
            const extension = files.image.originalFilename.split('.')[1];
            const filename = `${new ShortUniqueId().randomUUID(10)}.${extension}`;

            fs.renameSync(
                files.image.filepath,
                `./public/uploads/${filename}`,
                err => {
                    console.log(err);
                    return res.status(500).json({
                        message: "Upload image failed!"
                    });
                })

            return res.status(200).json({
                url: `${url}/uploads/${filename}`
            });
        }
    });

}