import Select from "../Select";
import Roles from "../../constants/role";
import Input from "../Input";
import {useEffect, useState} from "react";
import {DepartmentService} from "../../services";
import MultipleSelect from "../MultipleSelect";
import {UserStatus} from "../../constants/status";

export default function EmployeeForm({ formik }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        DepartmentService.GetDepartments()
            .then(res => {
                setDepartments(res.data.data);
            });
    }

    return (
        <div>
            <hr className="mt-10"/>
            <h1 className="mt-5 mb-5 text-xl font-medium">Employee Information</h1>
            <div className="grid grid-cols-2 gap-4">
                <MultipleSelect
                    label="Role"
                    name="role"
                    value={formik.values.role}
                    options={Object.keys(Roles).map(key => Roles[key])}
                    onChange={formik.handleChange}
                    error={formik.errors.role}/>
                {formik.values.role === Roles.doctor && (
                    <Select
                        useSearch
                        label="Department"
                        name="department"
                        value={formik.values.department}
                        options={departments}
                        onChange={formik.handleChange}
                        error={formik.errors.department}/>
                )}
                {formik.values.role === Roles.doctor && (
                    <Input
                        label="Experience (year)"
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}/>
                )}
                <Select
                    useSearch
                    label="Status"
                    name="status"
                    options={UserStatus}
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.errors.status}/>
            </div>
        </div>
    )
}