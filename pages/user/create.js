import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Gender from "../../constants/gender";
import {Country} from "country-state-city";
import {useEffect, useState} from "react";
import {DepartmentService} from "../../services";
import Roles from "../../constants/role";

export default function Create() {
    const countries = Country.getAllCountries();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        DepartmentService.GetDepartments()
            .then(res => {
                console.log(res.data.data);
                setDepartments(res.data.data);
            });
    }

    return (
        <MainLayout title="Create User">
            <Card>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Full Name"/>
                    <Input
                        label="Email Address"/>
                    <Input
                        label="Password"
                        type="password"/>
                    <Input
                        label="Contact"/>
                    <Select
                        label="Gender"
                        name="gender"
                        options={Gender}/>
                    <Select
                        useSearch
                        label="Country"
                        name="country"
                        options={countries}/>
                    <Input
                        label="City"/>
                    <Input
                        label="Address"/>
                    <Select
                        useSearch
                        label="Department"
                        name="country"
                        options={departments}/>
                    <Select
                        label="Role"
                        name="country"
                        options={Object.keys(Roles).map(key => Roles[key])}/>
                    <Input
                        label="Experience (year)"/>
                </div>
                <div className="text-right">
                    <button className="h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                        Submit
                    </button>
                </div>
            </Card>
        </MainLayout>
    )
}