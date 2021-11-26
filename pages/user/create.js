import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Gender from "../../constants/gender";
import {Country} from "country-state-city";
import {useEffect, useState} from "react";
import {DepartmentService} from "../../services";
import Roles from "../../constants/role";
import SelectInput from "../../components/SelectInput";
import {useFormik} from "formik";
import * as yup from "yup";

const Statuses = [
    { name: "Active", value: 1 },
    { name: "Non Active", value: 0 }
];

export default function Create() {
    const countries = Country.getAllCountries();
    const [departments, setDepartments] = useState([]);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "", email: "", password: "", department: "", role: "", status: "", phoneCode: {}
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    })

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        DepartmentService.GetDepartments()
            .then(res => {
                setDepartments(res.data.data);
            });
    }
    // console.log(formik.values);
    return (
        <MainLayout title="Create User">
            <Card>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            name="name"
                            onChange={formik.handleChange}
                            error={formik.errors.name}/>
                        <Input
                            label="Email Address"
                            name="email"
                            onChange={formik.handleChange}
                            error={formik.errors.email}/>
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            error={formik.errors.password}/>
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
                            selected={formik.values.gender?.name}
                            options={Gender}
                            onChange={formik.handleChange}/>
                        <Select
                            useSearch
                            label="Country"
                            name="country"
                            selected={formik.values.country?.name}
                            options={countries}
                            onChange={formik.handleChange}/>
                        <Input
                            label="City"
                            name="city"
                            onChange={formik.handleChange}/>
                        <Input
                            label="Address"
                            name="address"
                            onChange={formik.handleChange}/>
                        <Select
                            useSearch
                            label="Department"
                            name="department"
                            selected={formik.values.department?.name}
                            options={departments}
                            onChange={formik.handleChange}
                            error={formik.errors.department}/>
                        <Select
                            label="Role"
                            name="role"
                            selected={formik.values.role?.name}
                            options={Object.keys(Roles).map(key => Roles[key])}
                            onChange={formik.handleChange}
                            error={formik.errors.role}/>
                        {formik.values.role === Roles.doctor && (
                            <Input
                                label="Experience (year)"
                                name="experience"
                                onChange={formik.handleChange}/>
                        )}
                        <Select
                            useSearch
                            label="Status"
                            name="status"
                            options={Statuses}
                            selected={formik.values.status?.name}
                            onChange={formik.handleChange}
                            error={formik.errors.status}/>
                    </div>
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