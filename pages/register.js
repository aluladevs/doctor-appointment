import Image from "next/image";
import Illustration from "../assets/register-illustration.svg";
import Logo from "../assets/logo.svg";
import Input from "../components/Input";
import * as yup from "yup";
import {useFormik} from "formik";
import {Register} from "../services/AuthService";
import {useState} from "react";
import Alert from "../components/Alert";

export default function Login() {
    const [result, setResult] = useState(null);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        name: yup.string().required("Full name is required"),
        password: yup.string().required("Password is required"),
        confirm: yup.string().required("Confirm password is required")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    const formik = useFormik({
        initialValues: { email: "", name: "", password: "", confirm: "" },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });
    
    const handleSubmit = async (values) => {
        Register(values)
            .then(res => console.log(res))
            .catch(err => setResult({
                failed: true,
                message: err.response.data.message
            }));
    }

    return (
        <div className="flex justify-around">
            <div className="flex items-center">
                <Image src={Illustration} width={500} height={500}/>
            </div>
            <div className="w-1/3 h-screen flex flex-col justify-center items-center">
                <Image src={Logo} width={220} height={70}/>
                <h1 className="mt-5 mb-7 text-lg">Sign Up</h1>

                {result && (
                    <Alert
                        className="my-4"
                        color={result.success ? "success" : "error"}
                        message={result.message}/>
                )}

                <form className="w-full" onSubmit={formik.handleSubmit}>
                    <div className="w-full my-4">
                        <Input
                            label="Email Address"
                            name="email"
                            onChange={formik.handleChange}
                            error={formik.errors.email}/>
                    </div>
                    <div className="w-full my-4">
                        <Input
                            label="Full Name"
                            name="name"
                            onChange={formik.handleChange}
                            error={formik.errors.name}/>
                    </div>
                    <div className="w-full my-4">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            error={formik.errors.password}/>
                    </div>
                    <div className="w-full my-4">
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirm"
                            onChange={formik.handleChange}
                            error={formik.errors.confirm}/>
                    </div>
                    <button type="submit" className="w-full my-4 py-3 bg-primary text-white text-sm rounded-xl">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}