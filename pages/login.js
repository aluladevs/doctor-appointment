import Image from "next/image";
import Illustration from "../assets/login-illustration.svg";
import Logo from "../assets/logo.svg";
import Input from "../components/Input";
import {useFormik} from "formik";
import * as yup from "yup";

export default function Login() {
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
        onSubmit: () => {

        }
    });

    return (
        <div className="flex justify-around">
            <div className="flex items-center">
                <Image src={Illustration} width={600} height={600}/>
            </div>
            <div className="w-1/3 h-screen flex flex-col justify-center items-center">
                <Image src={Logo} width={220} height={70}/>
                <h1 className="mt-5 mb-7 text-lg">Login</h1>

                <div className="w-full my-2">
                    <Input
                        label="Email Address"
                        name="email"
                        onChange={formik.handleChange}
                        error={formik.errors.email}/>
                </div>
                <div className="w-full my-2">
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        error={formik.errors.password}/>
                </div>
                <button className="w-full my-4 py-3 bg-primary text-white text-sm rounded-xl">
                    Login
                </button>
            </div>
        </div>
    )
}