import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

let cached = global.mongoose

async function database(req, res, next) {
    try {
        if (!cached) {
            cached = await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    }
    catch (ex) {
        console.error(ex);
    }

    return next();
}

export default database;