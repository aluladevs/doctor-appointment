import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import {OtherService, UserService} from "../../services";
import Roles from "../../constants/role";
import {useFormik} from "formik";
import * as yup from "yup";
import {useRouter} from "next/router";
import Input from "../../components/Input";
import {UserStatus} from "../../constants/status";
import Select from "../../components/Select";
import {EyeIcon, UserCircleIcon} from "@heroicons/react/solid";
import Image from "next/image";
import {useState} from "react";
import PageTitle from "../../components/PageTitle";
import IconButton from "../../components/IconButton";
import {EyeOffIcon} from "@heroicons/react/outline";

export default function Create() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Full name is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "", email: "", password: "", status: "", avatar: preview
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            handleSubmit(values);
        }
    });

    const changeImage = (e) => {
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);

        setImage(file);
        setPreview(objectUrl);
    };

    const handleSubmit = (values) => {
        const params = {
            name: values.name,
            email: values.email,
            password: values.password,
            status: values.value,
            role: [Roles.admin.value]
        };

        if (image) {
            OtherService.UploadImage([image])
                .then(res => {
                    params.avatar = res.data.url;

                    UserService.CreateUser(params)
                        .then(res => {
                            console.log(res);
                            if (res.data) {
                                router.push("/user");
                            }
                        })
                });
        } else {
            UserService.CreateUser(params)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        router.push("/user");
                    }
                })
        }
    }
    console.log(formik.values);
    return (
        <MainLayout>
            <PageTitle useBack title="Create User"/>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
                    <Card className="mb-4">
                        <p className="mb-4 text-center">Profile Picture</p>
                        <input type="file" id="image" onChange={changeImage} className="hidden"/>
                        <label htmlFor="image" className="cursor-pointer">
                            {!formik.values.avatar ? (
                                <UserCircleIcon className="h-40 w-40 mx-auto text-gray-300"/>
                            ) : (
                                <div className="text-center">
                                    <Image alt="avatar" src={formik.values.avatar} width={128} height={128} className="rounded-full"/>
                                </div>
                            )}
                        </label>
                    </Card>
                    <Card className="col-span-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors.name}/>
                            <Input
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email}/>
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password}
                                prefix={(
                                    <IconButton transparent onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <EyeIcon className="w-6 h-6 text-gray-400"/>
                                        ) : (
                                            <EyeOffIcon className="w-6 h-6 text-gray-400"/>
                                        )}
                                    </IconButton>
                                )}/>
                            <Select
                                label="Status"
                                name="status"
                                options={UserStatus}
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.errors.status}/>
                        </div>

                        <div className="text-right">
                            <button type="submit" className="w-full lg:w-auto h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                                Submit
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </MainLayout>
    )
}