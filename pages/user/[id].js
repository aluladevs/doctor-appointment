import Card from "../../components/Card";
import AccountForm from "../../components/user/AccountForm";
import InformationForm from "../../components/user/InformationForm";
import EmployeeForm from "../../components/user/EmployeeForm";
import MainLayout from "../../components/MainLayout";
import * as yup from "yup";
import {useFormik} from "formik";
import Roles from "../../constants/role";
import {UserService} from "../../services";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Gender from "../../constants/gender";
import {Country} from "country-state-city";
import {UserStatus} from "../../constants/status";
import PageTitle from "../../components/PageTitle";

export default function UpdateUser() {
    const router = useRouter();
    const { id } = router.query;
    const countries = Country.getAllCountries();

    const [user, setUser] = useState({});

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        name: yup.string().required("Full name is required")
    });

    const formik = useFormik({
        initialValues: {
            uid: user.uid,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role?.map(e => Roles[e]),
            status: UserStatus.find(e => e.value === user.status),
            phoneCode: {},
            contact: user.contact ?? '',
            gender: Gender.find(e => e.value === user.gender) ?? '',
            country: countries.find(e => e.name === user.country) ?? '',
            city: user.city,
            address: user.address,
            birthday: user.birthday
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            const params = {
                name: values.name,
                email: values.email,
                password: values.password,
                phoneCode: values.phoneCode.phonecode,
                contact: values.contact,
                birthday: values.birthday,
                gender: values.gender?.value,
                address: values.address,
                city: values.city,
                country: values.country.name,
                role: values.role.map(e => e.value),
                status: values.status.value
            };

            if (params.role === Roles.doctor.value) {
                params.departmentId = values.department?._id;
                params.experience = values.experience;
            }

            if (!params.password) {
                delete params.password;
            }
            // console.log(params)
            UserService.UpdateUser(id, params)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        router.push("/user");
                    }
                })
        }
    });

    useEffect(() => {
        if (id) {
            UserService.GetUserById(id)
                .then(res => {
                    const result = res.data;

                    setUser(result);
                    // Object.keys(result).forEach(key => {
                    //     if (key === 'role') {
                    //         formik.setFieldValue('role', result[key].map(e => Roles[e]));
                    //     } else if(key === 'gender') {
                    //         formik.setFieldValue('gender', Gender[result[key]]);
                    //     } else {
                    //         formik.setFieldValue(key, result[key]);
                    //     }
                    // })
                })
        }
    }, [id]);
    console.log(user)
    return (
        <MainLayout>
            <PageTitle useBack title="Update User"/>

            <Card>
                <form onSubmit={formik.handleSubmit}>
                    <AccountForm formik={formik}/>
                    <InformationForm formik={formik}/>
                    <EmployeeForm formik={formik}/>
                    <div className="text-right">
                        <button type="submit" className="h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                            Submit
                        </button>
                    </div>
                </form>
            </Card>
        </MainLayout>
    )
}