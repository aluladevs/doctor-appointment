import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import {StaffService, SpecializationService} from "../../services";
import {useFormik} from "formik";
import * as yup from "yup";
import {useRouter} from "next/router";
import Input from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import {useEffect, useState} from "react";
import MultipleSelect from "../../components/MultipleSelect";
import Datepicker from "../../components/Datepicker";
import SelectInput from "../../components/SelectInput";
import Select from "../../components/Select";
import Gender from "../../constants/gender";
import {Country} from "country-state-city";
import {EyeIcon} from "@heroicons/react/solid";
import IconButton from "../../components/IconButton";
import {EyeOffIcon} from "@heroicons/react/outline";

export default function Update() {
    const router = useRouter();
    const { id } = router.query;
    const countries = Country.getAllCountries().map(e => ({ isoCode: e.isoCode, name: e.name, phonecode: e.phonecode, flag: e.flag }));
    const [showPassword, setShowPassword] = useState(false);
    const [staff, setStaff] = useState({});

    useEffect(() => {
        if (id) {
            StaffService.GetStaffById(id)
                .then(res => {
                    setStaff(res.data);
                })
        }
    }, [id]);

    const validationSchema = yup.object().shape({
        name: yup.string().required("Full name is required"),
        email: yup.string().required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: staff?.name ?? '',
            email: staff?.user?.email ?? '',
            birthday: staff?.birthday,
            phoneCode: staff?.phoneCode,
            contact: staff?.contact,
            country: staff?.country,
            city: staff?.city ?? '',
            address: staff?.address ?? '',
            gender: Gender.find(e => e.value === staff?.gender)
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            StaffService.UpdateStaff(id, {
                ...values,
                ...(values.gender && {
                    gender: values.gender.value
                })
            })
                .then(res => {
                    if (res.data) {
                        router.push("/staff");
                    }
                })
        }
    });

    return (
        <MainLayout>
            <PageTitle title="Update Staff" useBack/>
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
                            helper="Leave empty if do not want to change password"
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