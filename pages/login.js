import Image from "next/image";
import Illustration from "../assets/login-illustration.svg";
import Logo from "../assets/logo.svg";
import Input from "../components/Input";
import {useFormik} from "formik";
import * as yup from "yup";
import {getSession, signIn} from "next-auth/client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Alert from "../components/Alert";
import {AuthService} from "../services";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        getSession().then(res => console.log(res));
    }, []);

    useEffect(() => {
        if (router.query.error) {
            setError(router.query.error);
        }
    }, [router.query]);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '', password: ''
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = async (values) => {
        await AuthService.Login(values);
    }

    return (
        <div className="flex justify-around">
            <div className="flex items-center">
                <Image src={Illustration} width={600} height={600}/>
            </div>
            <div className="w-1/3 h-screen flex flex-col justify-center items-center">
                <Image src={Logo} width={220} height={70}/>
                <h1 className="mt-5 mb-7 text-lg">Login</h1>

                {error && (
                    <Alert
                        className="my-4"
                        color="error"
                        message={error}/>
                )}

                <form className="w-full p-5 shadow-lg" onSubmit={formik.handleSubmit}>
                    <div className="w-full my-7">
                        <Input
                            label="Email Address"
                            name="email"
                            onChange={formik.handleChange}
                            error={formik.errors.email}/>
                    </div>
                    <div className="w-full my-7">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            error={formik.errors.password}/>
                    </div>
                    <button
                        type="submit"
                        className="w-full my-4 py-3 bg-primary text-white text-sm rounded-xl">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}