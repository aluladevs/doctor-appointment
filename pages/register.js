import Image from "next/image";
import Illustration from "../assets/register-illustration.svg";
import Logo from "../assets/logo.svg";
import Input from "../components/Input";
import * as yup from "yup";
import {useFormik} from "formik";

export default function Login() {
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        confirm: yup.string().required("Confirm password is required")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    const formik = useFormik({
        validateOnChange: true
    });

    return (
        <div className="flex justify-around">
            <div className="flex items-center">
                <Image src={Illustration} width={500} height={500}/>
            </div>
            <div className="w-1/3 h-screen flex flex-col justify-center items-center">
                <Image src={Logo} width={220} height={70}/>
                <h1 className="mt-5 mb-7 text-lg">Sign Up</h1>

                <div className="w-full my-2">
                    <Input
                        label="Email Address"/>
                </div>
                <div className="w-full my-2">
                    <Input
                        label="Full Name"/>
                </div>
                <div className="w-full my-2">
                    <Input
                        label="Password"
                        type="password"/>
                </div>
                <div className="w-full my-2">
                    <Input
                        label="Confirm Password"
                        type="password"/>
                </div>
                <button className="w-full my-4 py-3 bg-primary text-white text-sm rounded-xl">
                    Register
                </button>
            </div>
        </div>
    )
}