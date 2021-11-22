import NextAuth from 'next-auth'
import Providers from "next-auth/providers";
import User from "../../../models/user";
import {comparePassword} from "../../../lib/password";

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
                const user = await User.findOne({ email: credentials.email });
                console.log(user);
                if (user) {
                    const checkPassword = await comparePassword(user.password, credentials.password);

                    if (!checkPassword) {
                        throw new Error("Password doesnt match");
                    }

                    return user;
                }

                throw new Error("Password doesnt match");
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