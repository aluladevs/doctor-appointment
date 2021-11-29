import NextAuth from 'next-auth'
import Providers from "next-auth/providers";
import {comparePassword} from "../../../lib/password";
import {User} from "../../../models";
import mongoose from "mongoose";
import {UserStatus} from "../../../constants/status";

const options = {
    site: process.env.NEXTAUTH_URL,
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                const MONGODB_URI = process.env.MONGODB_URI

                const connect = await mongoose.connect(MONGODB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                if (connect) {
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        if (user.status === 0) {
                            throw new Error("Unable to login. Please contact admin!")
                        }

                        const checkPassword = await comparePassword(user.password, credentials.password);

                        if (!checkPassword) {
                            throw new Error("Password doesnt match");
                        }

                        return user;
                    }

                    throw new Error("Account not found");
                }

                throw new Error("Unable to connect to database");
            }
        })
    ],
    pages: {
        error: "/login"
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
            }

            return token
        },

        async session(session, token) {
            session.accessToken = token.accessToken
            session.role = token.role;

            return session
        }
    },
    debug: true
}

export default (req, res) => NextAuth(req, res, options)