import MainLayout from "../../components/MainLayout";
import {DoctorService, SpecializationService} from "../../services";
import {useFormik} from "formik";
import * as yup from "yup";
import {useRouter} from "next/router";
import PageTitle from "../../components/PageTitle";
import Input from "../../components/Input";
import Card from "../../components/Card";
import MultipleSelect from "../../components/MultipleSelect";
import Datepicker from "../../components/Datepicker";
import SelectInput from "../../components/SelectInput";
import Select from "../../components/Select";
import Gender from "../../constants/gender";
import {Country} from "country-state-city";
import {useEffect, useState} from "react";
import IconButton from "../../components/IconButton";
import {EyeIcon} from "@heroicons/react/solid";
import {EyeOffIcon} from "@heroicons/react/outline";

export default function Create() {
    const router = useRouter();
    const countries = Country.getAllCountries().map(e => ({ isoCode: e.isoCode, name: e.name, phonecode: e.phonecode, flag: e.flag }));
    const [showPassword, setShowPassword] = useState(false);
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        SpecializationService.GetSpecializations()
            .then(res => {
                setSpecializations(res.data.data);
            })
    }, []);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Full name is required"),
        specialization: yup.array().required("Specialization is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "", email: '', password: '', specialization: []
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            DoctorService.CreateDoctor({
                ...values,
                ...(values.gender && {
                    gender: values.gender.value
                }),
                specialization: values.specialization.map(e => e._id)
            })
                .then(res => {
                    if (res.data) {
                        router.push("/doctor");
                    }
                })
        }
    });

    return (
        <MainLayout>
            <PageTitle title="Add New Doctor" useBack/>

            <form onSubmit={formik.handleSubmit}>
                <Card className="my-8">
                    <h1 className="mt-5 mb-5 text-xl font-medium">Account Information</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Name"
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
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            prefix={(
                                <IconButton transparent onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeIcon className="w-6 h-6 text-gray-400"/>
                                    ) : (
                                        <EyeOffIcon className="w-6 h-6 text-gray-400"/>
                                    )}
                                </IconButton>
                            )}/>
                    </div>
                </Card>

                <Card>
                    <h1 className="mt-5 mb-5 text-xl font-medium">Basic Information</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <MultipleSelect
                            useSearch
                            label="Specialization"
                            name="specialization"
                            value={formik.values.specialization}
                            options={specializations}
                            onChange={formik.handleChange}
                            error={formik.errors.specialization}/>
                        <Datepicker
                            label="Birthday"
                            name="birthday"
                            value={formik.values.birthday}
                            onChange={formik.handleChange}/>
                        <SelectInput
                            label="Contact"
                            name="contact"
                            selected={formik.values.phoneCode}
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onSelectChange={(value) => formik.setFieldValue("phoneCode", value)}
                            options={countries.map(e => ({...e, value: e.phonecode}))}/>
                        <Select
                            label="Gender"
                            name="gender"
                            value={formik.values.gender}
                            options={Gender}
                            onChange={formik.handleChange}/>
                        <Select
                            useSearch
                            label="Country"
                            name="country"
                            value={formik.values.country}
                            options={countries.map(e => ({...e, value: e.name}))}
                            onChange={formik.handleChange}/>
                        <Input
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}/>
                        <Input
                            label="Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}/>
                    </div>
                </Card>

                <div className="text-right">
                    <button type="submit" className="h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                        Submit
                    </button>
                </div>
            </form>
        </MainLayout>
    )
}