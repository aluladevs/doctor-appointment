import Card from "../../components/Card";
import MainLayout from "../../components/MainLayout";
import * as yup from "yup";
import {useFormik} from "formik";
import Roles from "../../constants/role";
import {OtherService, UserService} from "../../services";
import {useRouter} from "next/router";
import Image from "next/image";
import {useEffect, useState} from "react";
import {UserStatus} from "../../constants/status";
import PageTitle from "../../components/PageTitle";
import Input from "../../components/Input";
import {UserCircleIcon} from "@heroicons/react/solid";

export default function UpdateUser() {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        name: yup.string().required("Full name is required")
    });

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            password: '',
            avatar: user.avatar || preview,
            role: user.role?.map(e => Roles[e]),
            status: UserStatus.find(e => e.value === user.status)
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values)
        }
    });

    useEffect(() => {
        if (id) {
            UserService.GetUserById(id)
                .then(res => {
                    const result = res.data;

                    setUser(result);
                })
        }
    }, [id]);
    
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
            role: values.role.map(e => e.value),
            status: values.status.value
        };

        if (!params.password) {
            delete params.password;
        }

        if (image) {
            OtherService.UploadImage([image])
                .then(res => {
                    params.avatar = res.data.url;

                    UserService.UpdateUser(id, params)
                        .then(res => {
                            if (res.data) {
                                router.push("/user");
                            }
                        });
                });
        } else {
            UserService.UpdateUser(id, params)
                .then(res => {
                    if (res.data) {
                        router.push("/user");
                    }
                });
        }
    }
    console.log(formik.values.avatar)
    return (
        <MainLayout>
            <PageTitle useBack title="Update User"/>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-4 gap-4">
                    <Card className="lg:col-span-1 md:col-span-4">
                        <p className="mb-4 text-center">Profile Picture</p>
                        <input type="file" id="image" onChange={changeImage} className="hidden"/>
                        <label htmlFor="image">
                            {!formik.values.avatar ? (
                                <UserCircleIcon className="h-40 w-40 mx-auto text-gray-300"/>
                            ) : (
                                <div className="text-center">
                                    <Image alt="avatar" src={preview || formik.values.avatar} width={128} height={128} className="rounded-full"/>
                                </div>
                            )}
                        </label>
                    </Card>
                    <Card className="col-span-3">
                        <div className="grid grid-cols-2 gap-4">
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
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password}
                                helper="Leave empty if do not want to change password"/>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                                Submit
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </MainLayout>
    )
}