import {DEV_URL, ENVIRONMENT, ApiInstance, PROD_URL} from "../lib/axios";
import {signIn} from "next-auth/client";

const Register = (params) => {
    return ApiInstance.post("auth/register", params);
}

const Login = async (params) => {
    return await signIn('credentials', {
        email: params.email,
        password: params.password,
        callbackUrl: `${ENVIRONMENT === "development" ? DEV_URL : PROD_URL}/dashboard`,
    }).then(res => console.log(res))
        .catch(err => console.log(err))
}

export const AuthService = {
    Register,
    Login
};