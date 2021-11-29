import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import {UserService} from "../../services";
import Roles from "../../constants/role";
import {useFormik} from "formik";
import * as yup from "yup";
import AccountForm from "../../components/user/AccountForm";
import InformationForm from "../../components/user/InformationForm";
import EmployeeForm from "../../components/user/EmployeeForm";
import {useRouter} from "next/router";

export default function Create() {
    const router = useRouter();
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Full name is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "", email: "", password: "", department: "", role: [], status: "", phoneCode: {}
        },
        validateOnChange: true,
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
                role: values.role.value
            };

            if (params.role === Roles.doctor.value) {
                params.departmentId = values.department?._id;
                params.experience = values.experience;
            }

            UserService.CreateUser(params)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        router.push("/user");
                    }
                })
        }
    });

    return (
        <MainLayout title="Create User">
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